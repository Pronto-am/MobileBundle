<?php

namespace Pronto\MobileBundle\Form;

use Pronto\MobileBundle\DTO\CustomerDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CustomerForm extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('companyName', null, [
                'attr'  => [
                    'class' => 'validate'
                ],
                'label' => 'customer.company_name'
            ])
            ->add('contactPerson', null, [
                'attr'  => [
                    'class' => 'validate'
                ],
                'label' => 'customer.contact_person'
            ])
            ->add('phoneNumber', null, [
                'attr'  => [
                    'class' => 'validate'
                ],
                'label' => 'customer.phone_number'
            ])
            ->add('email', EmailType::class, [
                'attr'  => [
                    'class' => 'validate'
                ],
                'label' => 'customer.email'
            ])
            ->add('logo', FileType::class, [
                'label'    => 'customer.logo_label',
                'required' => false
            ]);

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            /** @var CustomerDTO $customerDTO */
            $customerDTO = $event->getData();
            $form = $event->getForm();

            /** @noinspection ExceptionsAnnotatingAndHandlingInspection */
            $form
                ->add('primaryColor', null, [
                    'attr'  => [
                        'class' => 'jscolor'
                    ],
                    'data'  => $customerDTO === null ? '2a9d8f' : $customerDTO->primaryColor,
                    'label' => 'customer.primary_color'
                ])
                ->add('secondaryColor', null, [
                    'attr'  => [
                        'class' => 'jscolor'
                    ],
                    'data'  => $customerDTO === null ? 'ffa801' : $customerDTO->secondaryColor,
                    'label' => 'customer.secondary_color'
                ])
                ->add('sidebarColor', null, [
                    'attr'  => [
                        'class' => 'jscolor'
                    ],
                    'data'  => $customerDTO === null ? '40474f' : $customerDTO->sidebarColor,
                    'label' => 'customer.sidebar_color'
                ]);

        });
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CustomerDTO::class
        ]);
    }
}
