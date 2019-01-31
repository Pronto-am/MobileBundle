<?php

namespace Pronto\MobileBundle\Form;


use Pronto\MobileBundle\Request\UserRequest;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add('firstName', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'user.first_name'
			])
			->add('insertion', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'user.insertion'
			])
			->add('lastName', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'user.last_name'
			])
			->add('email', EmailType::class, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'user.email'
			])
			->add('admin', CheckboxType::class, [
				'label'      => 'user.administrator',
				'mapped'     => false,
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
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => UserRequest::class
		]);
	}
}