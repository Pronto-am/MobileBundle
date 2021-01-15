<?php

namespace Pronto\MobileBundle\Controller\Web;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Debug\Exception\FlattenException;
use Symfony\Component\HttpKernel\Log\DebugLoggerInterface;

class ExceptionController extends Controller
{
	public function showExceptionAction(FlattenException $exception, DebugLoggerInterface $logger = null)
	{
		$view = 'error';

		if(in_array($exception->getStatusCode(), [403, 404, 500])) {
			$view .= $exception->getStatusCode();
		}

		return $this->render('@ProntoMobile/exceptions/' . $view . '.html.twig', [
			'exception' => $exception
		]);
	}
}