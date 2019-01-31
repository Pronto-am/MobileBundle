<?php

namespace Pronto\MobileBundle\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ResetPasswordForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add('password', RepeatedType::class, [
				'type'        => PasswordType::class,
				'attr'        => [
					'class' => 'validate'
				],
				'constraints' => [
					new NotBlank(),
					new Length(['min' => 6]),
				],
				'invalid_message' => 'passwordFieldsMismatch',
				'first_options' => [
					'label' => 'password'
				],
				'second_options' => [
					'label' => 'user.password_confirm'
				]
			]);
	}
}