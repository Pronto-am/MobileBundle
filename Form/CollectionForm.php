<?php

namespace Pronto\MobileBundle\Form;


use Pronto\MobileBundle\Entity\Collection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CollectionForm extends AbstractType
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
				'label' => 'collection.name'
			])
			->add('identifier', null, [
				'attr'     => [
					'readonly' => true
				],
				'label'    => 'collection.identifier',
				'required' => false
			])
			->add('icon', ChoiceType::class, [
				'attr'        => [
					'class' => 'select2 browser-default'
				],
				'choices'     => array_flip($options['fontAwesome']->getReadableNames()),
				'choice_attr' => function ($value, $key, $index) {
					return [
						'data-class' => $value
					];
				},
				'label'       => 'collection.icon'
			]);
	}

	/**
	 * @param OptionsResolver $resolver
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => Collection::class
		]);

		$resolver->setRequired('fontAwesome');
	}
}