<?php

namespace Pronto\MobileBundle\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;

class LoginForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
            	'label_attr' => [
            		'class' => 'no-asterisk'
				]
			])
            ->add('password', PasswordType::class, [
				'label_attr' => [
					'class' => 'no-asterisk'
				]
			]);
    }
}