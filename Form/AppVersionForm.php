<?php

namespace Pronto\MobileBundle\Form;


use Pronto\MobileBundle\DTO\AppVersionDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AppVersionForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder->add('version', TextType::class, [
			'label' => 'app_version.version',
			'attr'  => [
				'class' => 'validate'
			],
		])->add('platform', ChoiceType::class, [
			'label'   => 'app_version.platform',
			'attr'    => [
				'class' => 'validate'
			],
			'choices' => [
				'Android' => 'android',
				'iOS'     => 'ios'
			]
		])->add('releaseDate', DateType::class, [
			'label'  => 'app_version.release_date',
			'widget' => 'single_text',
			'html5'  => false,
			'format' => 'dd-MM-yyyy',
			'attr'   => [
				'class' => 'validate datepicker'
			],
		])->add('required', CheckboxType::class, [
			'label'      => 'app_version.required',
			'label_attr' => [
				'class' => 'no-asterisk'
			]
		])->add('description', CollectionType::class, [
			'entry_type'    => TextareaType::class,
			'entry_options' => [
				'attr' => [
					'class' => 'validate materialize-textarea'
				]
			],
		])->add('file', FileType::class, [
			'label'    => 'app_version.file',
			'required' => $builder->getData()->new,
			'attr'     => [
				'class' => 'validate'
			],
		])->add('url', UrlType::class, [
			'label' => 'app_version.url',
			'attr'  => [
				'class' => 'validate'
			],
		]);
	}

	/**
	 * @param OptionsResolver $resolver
	 * @throws \Symfony\Component\OptionsResolver\Exception\AccessException
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => AppVersionDTO::class
		]);
	}
}