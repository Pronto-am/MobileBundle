<?php

namespace Pronto\MobileBundle\Form;

use Pronto\MobileBundle\DTO\TranslationDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TranslationForm extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('identifier', TextType::class, [
            'attr'  => [
                'class' => 'validate'
            ],
            'label' => 'translation.identifier'
        ])->add('description', TextType::class, [
            'required' => false,
            'label'    => 'translation.description'
        ])->add('type', ChoiceType::class, [
            'attr'    => [
                'class' => 'validate'
            ],
            'choices' => [
                'App'              => 'app',
                'Metadata'         => 'metadata',
                'App- & Playstore' => 'store'
            ],
            'label'   => 'translation.type'
        ])->add('android', CheckboxType::class, [
            'label'      => 'remote_config.platforms.android',
            'label_attr' => [
                'class' => 'no-asterisk'
            ]
        ])->add('ios', CheckboxType::class, [
            'label'      => 'remote_config.platforms.ios',
            'label_attr' => [
                'class' => 'no-asterisk'
            ]
        ])->add('id', HiddenType::class);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => TranslationDTO::class
        ]);
    }
}
