<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\ErrorHandler\Exception\FlattenException;
use Symfony\Component\HttpKernel\Log\DebugLoggerInterface;

class ExceptionController extends AbstractController
{
    public function showExceptionAction(FlattenException $exception, DebugLoggerInterface $logger = null)
    {
        $view = 'error';

        if (in_array($exception->getStatusCode(), [403, 404, 500])) {
            $view .= $exception->getStatusCode();
        }

        return $this->render('@ProntoMobile/exceptions/' . $view . '.html.twig', [
            'exception' => $exception
        ]);
    }
}
