<?php

namespace Pronto\MobileBundle\Form\Collection;


use Pronto\MobileBundle\DTO\Collection\RelationshipDTO;
use Pronto\MobileBundle\Entity\Collection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatorInterface;

class RelationshipForm extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
        /** @var TranslatorInterface $translator */
        $translator = $options['translator'];

		$builder
			->add('name', null, [
				'attr'  => [
					'class' => 'validate'
				],
				'label' => 'collection.relationship.name'
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
				'label'        => 'collection.relationship.type',
				'choices'      => $options['types'],
				'choice_label' => function (Collection\Relationship\Type $type, $key, $index) {
					return ucfirst($type->getName());
				},
				'choice_value' => function (Collection\Relationship\Type $type = null) {
					return $type ? $type->getId() : '';
				}
			])
			->add('relatedCollection', ChoiceType::class, [
				'attr'         => [
					'class' => 'browser-default'
				],
				'label'        => 'collection.relationship.related_collection',
				'choices'      => $options['collections'],
				'choice_label' => function (Collection $collection, $key, $index) {
					return ucfirst($collection->getName());
				},
				'choice_value' => function (Collection $collection = null) {
					return $collection ? $collection->getId() : '';
				}
			])
            ->add('editableForRole', ChoiceType::class, [
                'attr'         => [
                    'class' => 'browser-default'
                ],
                'label'        => 'collection.property.editable_for_role',
                'choices'      => [
                    $translator->trans('user.roles.regular')     => 'ROLE_USER',
                    $translator->trans('user.roles.admin')       => 'ROLE_ADMIN',
                    $translator->trans('user.roles.super_admin') => 'ROLE_SUPER_ADMIN',
                ],
            ])
			->add('includeInJsonListView', CheckboxType::class, [
				'label' => 'collection.property.include_in_json_list_view'
			]);
	}

	/**
	 * @param OptionsResolver $resolver
	 */
	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => RelationshipDTO::class
		]);

		$resolver->setRequired(['types', 'collections', 'translator']);
	}
}
