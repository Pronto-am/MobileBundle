<?php

namespace Pronto\MobileBundle\Form\Application;


use Pronto\MobileBundle\Entity\Application\Version;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class VersionForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('name', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'application.name'
			]);
	}


	/**
	 * @param OptionsResolver $resolver
	 */
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => Version::class
		]);
	}
}