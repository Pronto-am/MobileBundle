<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\CustomerDTO;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;
use Pronto\MobileBundle\Form\CustomerForm;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Pronto\MobileBundle\Utils\Str;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Translation\TranslatorInterface;

class CustomerController extends BaseController
{
    /**
     * Let the user select a customer from the list
     *
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function selectCustomerAction(EntityManagerInterface $entityManager)
    {
        $customers = $entityManager->getRepository(Customer::class)->findBy([], ['companyName' => 'asc']);

        return $this->render('@ProntoMobile/customers/customers.html.twig', [
            'customers' => $customers
        ]);
    }

    /**
     * @throws EntityNotFoundException
     */
    public function setCustomerAction(Request $request)
    {
        // Get the Id from the request
        $id = $request->request->getInt('id');

        if ($id === null) {
            throw new EntityNotFoundException();
        }

        $response = new SuccessResponse(['url' => $this->generateAbsoluteUrl('pronto_mobile_select_application')]);

        $request->getSession()->set(Customer::SESSION_IDENTIFIER, $id);

        sleep(1);

        $response->create();

        return $response->getJsonResponse();
    }

    public function addAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CustomerForm::class);

        $form->remove('logo');
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var CustomerDTO $customerDTO */
            $customerDTO = $form->getData();
            $customer = $customerDTO->toEntity(new Customer());

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
     * @param EntityManagerInterface $entityManager
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, EntityManagerInterface $entityManager)
    {
        /** @var Customer $originalCustomer */
        $originalCustomer = $this->getCustomer();

        $uploadsFolder = $this->prontoMobile->getConfiguration('uploads_folder', 'uploads');

        // The form requires an instance of File, so parse the filename to a File object
        if ($originalCustomer->getLogo() !== null) {
            try {
                $file = new File('/' . Str::removeSlashes($uploadsFolder, true, true), '/customers/images/' . $originalCustomer->getLogo());
            } catch (FileNotFoundException $exception) {
                $file = null;
            }

            $originalCustomer->setLogo($file);
        }

        $file = $originalCustomer->getLogo();

        $customerDTO = CustomerDTO::fromEntity($originalCustomer);

        $form = $this->createForm(CustomerForm::class, $customerDTO);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $customerDTO = $form->getData();

            /** @var Customer $customer */
            $customer = $customerDTO->toEntity($originalCustomer);

            if ($file !== null && $customer->getLogo() === null) {
                $customer->setLogo($file->getFileName());
            }

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
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     * @return JsonResponse
     */
    public function deleteAction(Request $request, EntityManagerInterface $entityManager, TranslatorInterface $translator)
    {
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
