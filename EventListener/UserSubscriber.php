<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Service\ProntoMobile;
use Psr\Container\ContainerInterface;
use Swift_Mailer;
use Swift_Message;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class UserSubscriber implements EventSubscriber
{
    /**
     * @var ProntoMobile $prontoMobile
     */
    private $prontoMobile;

    /**
     * @var TranslatorInterface $translator
     */
    private $translator;

    /**
     * @var Swift_Mailer $mailer
     */
    private $mailer;

    /**
     * @var Environment $twig
     */
    private $twig;

    /**
     * @var Router $router
     */
    private $router;

    /**
     * UserSubscriber constructor.
     * @param TranslatorInterface $translator
     * @param ContainerInterface $container
     * @param Swift_Mailer $mailer
     */
	public function __construct(TranslatorInterface $translator, ContainerInterface $container, Swift_Mailer $mailer)
	{
		$this->translator = $translator;
		$this->prontoMobile = $container->get('pronto_mobile.global.app');
		$this->twig = $container->get('twig');
		$this->router = $container->get('router');
		$this->mailer = $mailer;
	}

	/**
	 * Returns an array of events this subscriber wants to listen to.
	 *
	 * @return string[]
	 */
	public function getSubscribedEvents(): array
	{
		return [Events::postPersist];
	}

    /**
     * @param LifecycleEventArgs $args
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
	public function postPersist(LifecycleEventArgs $args): void
	{
		$user = $args->getEntity();

		if (!$user instanceof User) {
			return;
		}

        $domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

        // Create an account activation link for the user and mail it
        $message = (new Swift_Message($this->translator->trans('authentication.create_password')))
            ->setFrom('noreply@' . $domain)
            ->setTo($user->getEmail())
            ->setBody(
                $this->twig->render('@ProntoMobile/mails/registration.html.twig', [
                    'user'   => $user,
                    'action' => [
                        'url'  => $this->router->generate('pronto_mobile_create_password', ['token' => $user->getActivationToken()], UrlGeneratorInterface::ABSOLUTE_URL),
                        'text' => $this->translator->trans('authentication.create_password')
                    ]
                ]), 'text/html');

        $this->mailer->send($message);
	}
}
