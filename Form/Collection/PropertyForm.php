<?php

namespace Pronto\MobileBundle\Form\Collection;


use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Pronto\MobileBundle\Request\Collection\PropertyRequest;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PropertyForm extends AbstractType
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
			->add('type', ChoiceType::class, [
				'attr'         => [
					'class' => 'browser-default'
				],
				'label'        => 'collection.type',
				'choices'      => $options['types'],
				'choice_label' => function (Type $type, $key, $index) use ($options) {
					$name = $type->getType();

					return ucfirst($name);
				},
				'choice_value' => function (Type $type = null) {
					return $type ? $type->getId() : '';
				},
				'choice_attr'  => function (Type $type, $key, $index) {
					return [
						'data-listview-compatible'      => $type->getListviewCompatible() ? 1 : 0,
						'data-json-listview-compatible' => $type->getJsonListviewCompatible() ? 1 : 0
					];
				},
			])
			->add('includeInListView', CheckboxType::class, [
				'label' => 'collection.property.include_in_table_list_view',
				'label_attr' => [
					'class' => 'no-asterisk'
				]
			])
			->add('includeInJsonListView', CheckboxType::class, [
				'label' => 'collection.property.include_in_json_list_view',
				'label_attr' => [
					'class' => 'no-asterisk'
				]
			])
			->add('required', CheckboxType::class, [
				'label' => 'collection.property.required',
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
			'data_class' => PropertyRequest::class
		]);

		$resolver->setRequired(['types']);
	}
}