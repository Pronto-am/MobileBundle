<?php

namespace Pronto\MobileBundle\Form;

use Pronto\MobileBundle\DTO\RemoteConfigDTO;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\Exception\AccessException;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class RemoteConfigForm extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        /** @var AuthorizationCheckerInterface $authorizationChecker */
        $authorizationChecker = $options['authorizationChecker'];
        $editingDisabled = !$authorizationChecker->isGranted('ROLE_SUPER_ADMIN');

        $builder->add('name', TextType::class, [
            'label' => 'remote_config.name',
            'attr'  => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [
                'class' => 'validate',
            ],
        ])->add('identifier', TextType::class, [
            'label' => 'remote_config.identifier',
            'attr'  => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [
                'class' => 'validate',
            ],
        ])->add('type', ChoiceType::class, [
            'label'   => 'remote_config.type',
            'attr'    => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [
                'class' => 'validate',
            ],
            'choices' => array_reduce([
                RemoteConfigType::STRING(),
                RemoteConfigType::INTEGER(),
                RemoteConfigType::BOOL(),
                RemoteConfigType::ENUM(),
                RemoteConfigType::JSON(),
            ], function ($result, RemoteConfigType $type) use ($options) {
                $result[$options['translator']->trans('remote_config.type.' . $type->getValue())] = $type->getValue();
                return $result;
            }, []),
        ])->add('releaseDate', DateType::class, [
            'label'    => 'remote_config.release_date',
            'widget'   => 'single_text',
            'required' => false,
            'html5'    => false,
            'format'   => 'dd-MM-yyyy',
            'attr'     => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [
                'class' => 'validate datepicker',
            ],
        ])->add('description', TextType::class, [
            'label'    => 'remote_config.description',
            'required' => false,
            'attr'     => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [
                'class' => 'validate',
            ],
        ])->add('android', CheckboxType::class, [
            'label'      => 'remote_config.platforms.android',
            'label_attr' => [
                'class' => 'no-asterisk'
            ],
            'attr'       => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [],
        ])->add('ios', CheckboxType::class, [
            'label'      => 'remote_config.platforms.ios',
            'label_attr' => [
                'class' => 'no-asterisk'
            ],
            'attr'       => $editingDisabled ? [
                'disabled' => 'disabled'
            ] : [],
        ])->add('id', HiddenType::class);
    }

    /**
     * @param OptionsResolver $resolver
     * @throws AccessException
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setRequired(['translator', 'authorizationChecker']);
        $resolver->setDefaults([
            'data_class' => RemoteConfigDTO::class
        ]);
    }
}
