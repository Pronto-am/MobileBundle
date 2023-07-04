<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Command\Firebase;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\PushNotification\Sender;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SendPushNotificationsCommand extends Command
{
    private EntityManagerInterface $entityManager;

    private Sender $sender;

    private ProntoMobile $prontoMobile;

    public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container, Sender $sender, $name = null)
    {
        $this->entityManager = $entityManager;
        $this->sender = $sender;
        $this->prontoMobile = $container->get(ProntoMobile::class);

        parent::__construct($name);
    }

    protected function configure()
    {
        $this->setName('firebase:notifications:send')
            ->setDescription('Sends the push notifications, scheduled for the current time')
            ->setHelp('This command sends scheduled push notifications for you');
    }

    /**
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $currentDate = new DateTime();

        // Get the to-send notifications
        $notifications = $this->entityManager->getRepository(PushNotification::class)->retrieveScheduledTasksByDate($currentDate);

        // Write a status to the console
        if (count($notifications) > 0) {
            $output->writeln([
                'Sending ' . count($notifications) . ' scheduled notification(s)',
                '',
            ]);
        } else {
            $output->writeln([
                'No notifications to be send',
            ]);

            return Command::SUCCESS;
        }

        $ids = [];

        /** @var PushNotification $notification */
        foreach ($notifications as $notification) {
            $ids[] = $notification->getId();
        }

        // Set all of the retrieved notifications as being processed
        $this->entityManager->getRepository(PushNotification::class)->setBeingProcessedByIds($ids);

        foreach ($notifications as $notification) {

            $output->writeln('- Sending: ' . $notification->getId());

            /** @var Application $application */
            $application = $notification->getApplication();
            $configuration = $this->prontoMobile->getPluginConfiguration(Plugin::PUSH_NOTIFICATIONS, $application);

            if ($this->sender->setServerKey($configuration[Plugin::PUSH_NOTIFICATIONS_FIREBASE_TOKEN])) {

                try {
                    $this->sender->setNotification($notification);
                    $this->sender->send();
                } catch (Exception $exception) {
                    $output->writeln([' - Error sending the notification', ' - E: ' . $exception->getMessage()]);
                    $notification->setBeingProcessed(0);
                    $this->entityManager->persist($notification);
                    continue;
                }

                $output->writeln($this->sender->getLogging());

                // Set the notification to sent and remove the scheduled datetime
                if ($notification->getSent() === null) {
                    $notification->setSent(new DateTime());
                }

                $notification->setScheduledSending(null);
            } else {
                $output->writeln('Firebase Server Key is invalid');
            }

            $notification->setBeingProcessed(0);
            $this->entityManager->persist($notification);
        }

        $this->entityManager->flush();
        return Command::SUCCESS;
    }
}
