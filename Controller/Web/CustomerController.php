<?php

namespace Pronto\MobileBundle\Controller\Web;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Form\CustomerForm;
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
			$response = new JsonResponse(['error' => false, 'url' => $this->generateUrl('pronto_mobile_select_application', [], UrlGeneratorInterface::ABSOLUTE_URL)]);

			$request->getSession()->set(Customer::SESSION_IDENTIFIER, $id);
		} else {
			$response = new JsonResponse(['error' => true, 'message' => 'No ID present']);
		}

		return $response;
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
			$customer = $form->getData();

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
		if (!empty($originalCustomer->getLogo())) {
			$originalCustomer->setLogo(new File(Str::removeSlashes($uploadsFolder, true, true) , '/customers/images/' . $originalCustomer->getLogo()));
		}

		$file = $originalCustomer->getLogo();

		$form = $this->createForm(CustomerForm::class, $originalCustomer);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$customer = $form->getData();

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

		return new JsonResponse(['error' => false, 'redirectUrl' => $this->generateUrl('pronto_mobile_select_customer')]);
	}
}