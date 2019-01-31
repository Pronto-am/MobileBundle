<?php

namespace Pronto\MobileBundle\Form;


use Pronto\MobileBundle\Request\ApplicationRequest;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ApplicationForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add('name', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'application.name'
			])
			->add('label', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'application.label'
			])
			->add('color', null, [
				'attr'  => [
					'class' => 'validate jscolor'
				],
				'label' => 'application.color'
			])
			->add('androidBundleIdentifier', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'application.android_bundle_identifier'
			])
			->add('iosBundleIdentifier', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'application.ios_bundle_identifier'
			]);

		$builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) use ($options) {
			/** @var ApplicationRequest $application */
			$application = $event->getData();
			$form = $event->getForm();

			$form
				->add('clientId', null, [
					'attr'   => [
						'readonly' => true
					],
					'mapped' => false,
					'label'  => 'application.client_id',
					'data'   => $application->clientId
				])
				->add('clientSecret', null, [
					'attr'   => [
						'readonly' => true
					],
					'mapped' => false,
					'label'  => 'application.client_secret',
					'data'   => $application->clientSecret
				])
				->add('defaultLanguage', ChoiceType::class, [
					'attr'         => [
						'class' => 'select2 browser-default'
					],
					'choices'      => $options['languages']->getArray(),
					'choice_label' => function ($value, $key, $index) {
						return $value->name;
					},
					'choice_value' => function ($language) {
						return $language->code ?? 0;
					},
					'choice_attr'  => function ($value, $key, $index) use ($application, $options) {
						return [
							'selected' => $application !== null && !empty($application->defaultLanguage) ? $application->defaultLanguage === $value->code : $value->code === $options['locale']
						];
					},
					'label'        => 'application.default_language',
				])->add('availableLanguages', ChoiceType::class, [
					'attr'         => [
						'class' => 'select2 browser-default'
					],
					'choices'      => $options['languages']->getArray(),
					'choice_label' => function ($value, $key, $index) {
						return $value->name;
					},
					'choice_value' => function ($language) {
						return $language->code ?? 0;
					},
					'choice_attr'  => function ($value, $key, $index) use ($application, $options) {
						return [
							'selected' => $application !== null && !empty($application->availableLanguages) ? in_array((array)$value, $application->availableLanguages) : $value->code === $options['locale']
						];
					},
					'label'        => 'application.available_languages',
					'multiple'     => true
				]);
		});
	}


	/**
	 * @param OptionsResolver $resolver
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => ApplicationRequest::class
		]);

		$resolver->setRequired([
			'languages', 'locale'
		]);
	}
}