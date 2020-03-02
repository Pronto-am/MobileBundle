<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\Auth;


use Doctrine\Common\Annotations\AnnotationException;
use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

/**
 * Class LoginController
 * @package Pronto\MobileBundle\Controller\Api\Vue\Auth
 * @Route(path="auth/")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class UserController extends ApiController
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * LoginController constructor.
     * @param EntityManagerInterface $entityManager
     * @throws \Exception
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route(path="user", methods={"GET"})
     * @IsGranted("ROLE_USER")
     */
    public function profileAction()
    {
        return $this->response($this->getUser(), [
            new DateTimeNormalizer()
        ]);
    }
}
