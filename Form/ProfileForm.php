<?php

namespace Pronto\MobileBundle\Form;


use Pronto\MobileBundle\Entity\User;
use Doctrine\DBAL\Types\StringType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ProfileForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add('firstName', null, [
				'attr'        => [
					'class' => 'validate'
				],
				'constraints' => [
					new NotBlank(),
				],
				'label'       => 'user.first_name'
			])
			->add('insertion', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'user.insertion'
			])
			->add('lastName', null, [
				'attr'        => [
					'class' => 'validate'
				],
				'constraints' => [
					new NotBlank()
				],
				'label'       => 'user.last_name'
			])
			->add('email', EmailType::class, [
				'attr'        => [
					'class' => 'validate'
				],
				'constraints' => [
					new NotBlank()
				],
				'label'       => 'user.email'
			]);
	}
}