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
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly Sender $sender,
        private readonly ProntoMobile $prontoMobile,
        $name = null
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
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

            $serviceAccountString = $configuration[Plugin::PUSH_NOTIFICATIONS_FIREBASE_SERVICE_ACCOUNT];
            if (!is_string($serviceAccountString)) {
                $output->writeln('Firebase Service Account is invalid');
                continue;
            }

            $serviceAccount = json_decode($serviceAccountString, true);
            if (!is_array($serviceAccount) || json_last_error() !== JSON_ERROR_NONE) {
                $output->writeln('Firebase Service Account is invalid');
                continue;
            }

            try {
                $this->sender->setServiceAccount($serviceAccount)
                    ->setNotification($notification)
                    ->send();
            } catch (Exception $exception) {
                $output->writeln([' - Error sending the notification', ' - E: ' . $exception->getMessage()]);
                $notification->setBeingProcessed(false);
                $this->entityManager->persist($notification);
                continue;
            }

            $output->writeln($this->sender->getLogging());

            // Set the notification to sent and remove the scheduled datetime
            if ($notification->getSent() === null) {
                $notification->setSent(new DateTime());
            }

            $notification->setScheduledSending(null);

            $notification->setBeingProcessed(false);
            $this->entityManager->persist($notification);
        }

        $this->entityManager->flush();
        return Command::SUCCESS;
    }
}
