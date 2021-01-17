<?php

namespace Pronto\MobileBundle\Form;


use Doctrine\ORM\EntityManager;
use Pronto\MobileBundle\DTO\PushNotificationDTO;
use Pronto\MobileBundle\Entity\Device\DeviceSegment;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PushNotificationForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add('schedule', CheckboxType::class, [
				'label'      => 'push_notification.schedule',
				'mapped'     => false,
				'attr'       => [
					'class' => 'filled-in'
				],
				'label_attr' => [
					'class' => 'no-asterisk'
				]
			])
			->add('scheduledSending', DateTimeType::class, [
				'date_widget' => 'single_text',
				'time_widget' => 'single_text',
				'html5'       => false,
				'label'       => 'push_notification.scheduledDate',
				'date_format' => 'dd-MM-yyyy',
			])
			->add('segment', ChoiceType::class, [
				'placeholder'  => 'push_notification.choose_segment',
				'choices'      => array_merge(['push_notification.all_devices'], $options['segments']),
				'choice_label' => function ($segment, $key, $index) use ($options) {
					if ($segment instanceof Segment) {
						$name = $segment->getName();

						$label = $options['json_translator']->getTranslation($name);

						return ucfirst($label);
					}

					return $segment;
				},
				'choice_value' => function ($segment = null) {
					if ($segment instanceof Segment) {
						return $segment->getId();
					}

					if ($segment === null) {
						return '';
					}

					return 0;
				},
				'choice_attr'  => function ($segment, $key, $index) use ($options) {
					if ($segment instanceof Segment) {
						/** @var EntityManager $entityManager */
						$entityManager = $options['entityManager'];

						return [
							'data-device-count' => $entityManager->getRepository(DeviceSegment::class)->getDeviceCountBySegment($segment)
						];
					}

					return [];
				},
			])
			->add('test', CheckboxType::class, [
				'label'      => 'push_notification.test_notification',
				'attr'       => [
					'class' => 'filled-in'
				],
				'label_attr' => [
					'class' => 'no-asterisk'
				]
			])
			->add('sendNow', SubmitType::class, [
				'label' => 'push_notification.send_now',
				'attr'  => [
					'class'          => 'btn btn-primary',
					'formnovalidate' => 'formnovalidate'
				]
			])
			->add('sendLater', SubmitType::class, [
				'label' => 'push_notification.schedule',
				'attr'  => [
					'class'          => 'btn btn-primary',
					'formnovalidate' => 'formnovalidate'
				]
			]);
	}


	/**
	 * @param OptionsResolver $resolver
	 * @throws \Symfony\Component\OptionsResolver\Exception\AccessException
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => PushNotificationDTO::class
		]);

		$resolver->setRequired([
			'segments', 'json_translator', 'entityManager'
		]);
	}
}
