<?php

namespace Pronto\MobileBundle\Form\Translation;


use Pronto\MobileBundle\DTO\Translation\UploadDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UploadForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$languages = array_reduce($options['application']->getAvailableLanguages(), function($result, $language) {
			$result[$language['name']] = $language['code'];

			return $result;
		}, []);

		$builder->add('file', FileType::class, [
			'label' => 'translation.upload_new'
		])->add('type', ChoiceType::class, [
			'attr'    => [
				'class' => 'validate'
			],
			'choices' => [
				'App'              => 'app',
				'Metadata'         => 'metadata',
				'App- & Playstore' => 'store'
			],
			'label'   => 'translation.type'
		])->add('language', ChoiceType::class, [
			'choices'      => $languages,
			'label'        => 'application.available_languages',
		])->add('android', CheckboxType::class)->add('ios', CheckboxType::class);
	}

	/**
	 * @param OptionsResolver $resolver
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => UploadDTO::class
		]);

		$resolver->setRequired([
			'application'
		]);
	}
}