<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Repository\CustomerRepository;
use Pronto\MobileBundle\Request\CustomerRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

/**
 * Class CustomerController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="customers")
 * @IsGranted("ROLE_SUPER_ADMIN")
 */
class CustomerController extends ApiController
{
    /**
     * @var CustomerRepository $customers
     */
    private $customers;

    /**
     * LoginController constructor.
     * @param CustomerRepository $customers
     */
    public function __construct(CustomerRepository $customers)
    {
        $this->customers = $customers;
    }

    /**
     * @Route(methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $customers = $this->customers->list();
        return $this->response($customers, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     * @throws \Exception
     */
    public function getAction(int $id)
    {
        $customer = $this->customers->findOrFail($id);
        return $this->response($customer, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param CustomerRequest $request
     * @return JsonResponse
     */
    public function saveAction(CustomerRequest $request)
    {
        $customer = $this->customers->findOrNew($request->get('id'));
        $customer = $this->serializer->deserialize(Customer::class, $request->all(), $customer);
        $this->customers->save($customer);

        return $this->response($customer, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function deleteAction()
    {
        return JsonResponse::create(['data' => []]);
    }
}
