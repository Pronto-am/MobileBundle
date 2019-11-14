<?php

namespace Pronto\MobileBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SPAController extends Controller
{
    /**
     * @Route("/beta/{route}", name="index", requirements={"route"="^(?!api|_(profiler|wdt)).*"})
     * @return Response
     */
    public function indexAction(): Response
    {
        return $this->render('@ProntoMobile/app.html.twig', []);
    }
}
