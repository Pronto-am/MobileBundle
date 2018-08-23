<?php

namespace Pronto\MobileBundle\Controller\Web;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Form\CustomerForm;
use Pronto\MobileBundle\Request\CustomerRequest;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Pronto\MobileBundle\Utils\Str;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CustomerController extends BaseController
{
	/**
	 * Let the user select a customer from the list
	 *
	 * @param Request $request
	 * @return Response
	 */
	public function selectCustomerAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$customers = $entityManager->getRepository(Customer::class)->findBy([], ['companyName' => 'asc']);

		return $this->render('@ProntoMobile/customers/customers.html.twig',
			[
				'customers' => $customers
			]);
	}


	/**
	 * Set the customer using the selection list
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function setCustomerAction(Request $request)
	{
		// Get the Id from the request
		$id = $request->request->getInt('id');

		if ($id !== null) {
			$response = new SuccessResponse(['url' => $this->generateAbsoluteUrl('pronto_mobile_select_application')]);

			$request->getSession()->set(Customer::SESSION_IDENTIFIER, $id);
		} else {
			$response = new ErrorResponse([404, 'No ID present']);
		}

		$response->create();

		return $response->getJsonResponse();
	}


	/**
	 * Add a new account
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function addAction(Request $request)
	{
		$form = $this->createForm(CustomerForm::class);

		$form->remove('logo');

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var CustomerRequest $customerRequest */
			$customerRequest = $form->getData();
			$customer = $customerRequest->toEntity();

			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($customer);
			$entityManager->flush();

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_select_customer');
		}

		return $this->render('@ProntoMobile/customers/add.html.twig', [
			'customerForm' => $form->createView()
		]);
	}


	/**
	 * Edit a customers' account
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request)
	{
		/** @var Customer $originalCustomer */
		$originalCustomer = $this->getCustomer();

		$prontoMobile = $this->get('pronto_mobile.global.app');
		$uploadsFolder = $prontoMobile->getConfiguration('uploads_folder', 'uploads');

		// The form requires an instance of File, so parse the filename to a File object
		if ($originalCustomer->getLogo() !== null) {
			$originalCustomer->setLogo(new File(Str::removeSlashes($uploadsFolder, true, true) , '/customers/images/' . $originalCustomer->getLogo()));
		}

		$file = $originalCustomer->getLogo();

		$customerRequest = CustomerRequest::fromEntity($originalCustomer);

		$form = $this->createForm(CustomerForm::class, $customerRequest);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var CustomerRequest $customerRequest */
			$customerRequest = $form->getData();
			$customer = $customerRequest->toEntity($originalCustomer);

			if ($file !== null && $customer->getLogo() === null) {
				$customer->setLogo($file->getFileName());
			}

			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($customer);
			$entityManager->flush();

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_edit_customer');
		}

		return $this->render('@ProntoMobile/customers/edit.html.twig', [
			'customerForm' => $form->createView()
		]);
	}


	/**
	 * Delete a customers' account
	 *
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function deleteAction(Request $request)
	{
		$translator = $this->get('translator');

		$entityManager = $this->getDoctrine()->getManager();
		$customer = $entityManager->getRepository(Customer::class)->findOneBy(['id' => $request->request->get('id')]);

		$entityManager->remove($customer);
		$entityManager->flush();

		$this->addFlash(
			'success',
			sprintf($translator->trans('account.removed'))
		);

		$response = new SuccessResponse(['redirectUrl' => $this->generateAbsoluteUrl('pronto_mobile_select_customer')]);

		return $response->create()->getJsonResponse();
	}
}