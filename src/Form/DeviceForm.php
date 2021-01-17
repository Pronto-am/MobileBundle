<?php

namespace Pronto\MobileBundle\Form;


use Pronto\MobileBundle\DTO\DeviceDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DeviceForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add('testDevice', CheckboxType::class, [
				'label'      => 'device.test_device',
				'attr'       => [
					'class' => 'filled-in'
				],
				'label_attr' => [
					'class' => 'no-asterisk'
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
			'data_class' => DeviceDTO::class
		]);
	}
}