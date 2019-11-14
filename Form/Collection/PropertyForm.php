<?php

namespace Pronto\MobileBundle\Form\Collection;


use Pronto\MobileBundle\DTO\Collection\PropertyDTO;
use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatorInterface;

class PropertyForm extends AbstractType
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
                        'data-json-listview-compatible' => $type->getJsonListviewCompatible() ? 1 : 0,
                        'data-translatable'             => $type->getTranslatable() ? 1 : 0,
                        'data-identifier'               => $type->getType(),
                    ];
                },
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
            ->add('includeInListView', CheckboxType::class, [
                'label'      => 'collection.property.include_in_table_list_view',
                'label_attr' => [
                    'class' => 'no-asterisk'
                ]
            ])
            ->add('includeInJsonListView', CheckboxType::class, [
                'label'      => 'collection.property.include_in_json_list_view',
                'label_attr' => [
                    'class' => 'no-asterisk'
                ]
            ])
            ->add('translatable', CheckboxType::class, [
                'label'      => 'collection.property.is_translatable',
                'label_attr' => [
                    'class' => 'no-asterisk'
                ]
            ])
            ->add('required', CheckboxType::class, [
                'label'      => 'collection.property.required',
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
            'data_class' => PropertyDTO::class
        ]);

        $resolver->setRequired(['types', 'translator']);
    }
}
