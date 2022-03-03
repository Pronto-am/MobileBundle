<?php

declare(strict_types=1);

namespace Pronto\MobileBundle;

use Composer\Script\Event;
use Symfony\Component\Yaml\Yaml;

class Scripts
{
    public static function postCreateProject(Event $event): void
    {
        $vendorDir = $event->getComposer()->getConfig()->get('vendor-dir');
        $packagesDir = $vendorDir . '/../config/packages/';
        $routesDir = $vendorDir . '/../config/routes/';
        $configDir = $vendorDir . '/../config/';

        // Modify the contents of the YAML files
        self::modifyProntoMobileConfiguration($packagesDir);
        self::modifyOauthServerConfiguration($packagesDir);
        self::modifySecurityConfiguration($packagesDir);
        self::modifyTwigConfiguration($packagesDir);
        self::modifyServicesConfiguration($configDir);

        self::addRoutes($routesDir);
    }

    public static function modifyProntoMobileConfiguration(string $packagesDir): void
    {
        $fileName = $packagesDir . '/pronto_mobile.yaml';

        $prontoMobile = [
            'pronto_mobile' => [
                'domain'         => 'pronto.am',
                'uploads_folder' => 'uploads',
                'firebase'       => [
                    'storage_decryption_password' => 'ThisTokenIsNotSoSecret'
                ]
            ]
        ];

        file_put_contents($fileName, Yaml::dump($prontoMobile, 4));
    }

    private static function modifyOauthServerConfiguration(string $packagesDir): void
    {
        $fileName = $packagesDir . '/trikoder_oauth2.yaml';

        $oauth = [
            'trikoder_oauth2' => [
                'authorization_server' => [
                    'private_key'                               => '%kernel.project_dir%/config/security/oauth/private.key',
                    'private_key_passphrase'                    => null,
                    'encryption_key'                            => '%env(string:OAUTH2_ENCRYPTION_KEY)%',
                    'access_token_ttl'                          => 'PT1H',
                    'refresh_token_ttl'                         => 'P1M',
                    'auth_code_ttl'                             => 'PT10M',
                    'require_code_challenge_for_public_clients' => null,
                    'enable_auth_code_grant'                    => false,
                    'enable_client_credentials_grant'           => false,
                    'enable_implicit_grant'                     => false,
                    'enable_password_grant'                     => false,
                    'enable_refresh_token_grant'                => false,
                ],

                'resource_server' => [
                    'public_key' => '%kernel.project_dir%/config/security/oauth/public.key',
                ],

                'scopes' => [],

                'persistence' => [
                    'doctrine' => [
                        'entity_manager' => 'default',
                    ],
                ],

                'exception_event_listener_priority' => 10,

                'role_prefix' => 'ROLE_OAUTH2_',
            ]
        ];

        file_put_contents($fileName, Yaml::dump($oauth, 4));
    }

    private static function modifySecurityConfiguration(string $packagesDir): void
    {
        $fileName = $packagesDir . '/security.yaml';

        $security = Yaml::parse(file_get_contents($fileName));
        $security['security']['providers'] = [
            'cms_users' => [
                'entity' => [
                    'class'    => 'Pronto\MobileBundle\Entity\User',
                    'property' => 'email'
                ]
            ],
            'app_users' => [
                'id' => 'Pronto\MobileBundle\Provider\AppUserProvider'
            ]
        ];

        $security['security']['password_hashers'] = [
            'Pronto\MobileBundle\Entity\User'    => 'bcrypt',
            'Pronto\MobileBundle\Entity\AppUser' => 'bcrypt'
        ];

        $security['security']['firewalls'] = [
            'dev' => $security['security']['firewalls']['dev'],

            'api_token' => [
                'pattern'  => '^/api/token',
                'security' => false,
            ],

            'api' => [
                'pattern'   => '^/api',
                'oauth2'    => true,
                'stateless' => true,
                'anonymous' => true,
                'provider'  => 'app_users'
            ],

            'main' => [
                'anonymous'   => true,
                'http_basic'  => null,
                'provider'    => 'cms_users',
                'switch_user' => [
                    'role'      => 'ROLE_SUPER_ADMIN',
                    'parameter' => '_switch_user'
                ],
                'guard'       => [
                    'provider'       => 'cms_users',
                    'authenticators' => [
                        'Pronto\MobileBundle\Security\LoginFormAuthenticator'
                    ]
                ],
                'logout'      => [
                    'path'   => '/logout',
                    'target' => '/login'
                ]
            ]
        ];

        $security['security']['access_control'] = [
            ['path' => '^/authorize', 'roles' => ['IS_AUTHENTICATED_REMEMBERED']],
            ['path' => '^/login', 'roles' => ['IS_AUTHENTICATED_ANONYMOUSLY']],
            ['path' => '^/admin/plugins', 'roles' => ['IS_AUTHENTICATED_ANONYMOUSLY']],
            ['path' => '^/admin/customers', 'roles' => ['ROLE_SUPER_ADMIN']],
            ['path' => '^/admin/notifications/segments', 'roles' => ['ROLE_SUPER_ADMIN']],
            ['path' => '^/admin/users/app', 'roles' => ['ROLE_USER']],
            ['path' => '^/admin/users', 'roles' => ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']],
            ['path' => '^/admin', 'roles' => ['ROLE_USER']],
        ];

        file_put_contents($fileName, Yaml::dump($security, 4));
    }

    private static function modifyTwigConfiguration(string $packagesDir): void
    {
        $fileName = $packagesDir . '/twig.yaml';

        $twig = [
            'twig' => [
                'globals' => [
                    'pronto_mobile'      => '@Pronto\MobileBundle\Service\ProntoMobile',
                    'entry_value_parser' => '@Pronto\MobileBundle\Service\Collection\EntryValueParser',
                    'json_translator'    => '@Pronto\MobileBundle\Service\JsonTranslator',
                ]
            ]
        ];

        file_put_contents($fileName, Yaml::dump($twig, 4));
    }

    private static function addRoutes(string $routesDir): void
    {
        $fileName = $routesDir . '/routes.yaml';

        $routes = [
            'pronto_mobile' => [
                'resource' => '@ProntoMobileBundle/Resources/config/routing.yaml',
            ]
        ];

        file_put_contents($fileName, Yaml::dump($routes, 4));
    }

    private static function modifyServicesConfiguration(string $configDir): void
    {
        $fileName = $configDir . '/services.yaml';

        $services = Yaml::parse(file_get_contents($fileName));
        $services['services']['Symfony\Component\DependencyInjection\ContainerInterface'] = '@service_container';

        file_put_contents($fileName, Yaml::dump($services, 4));
    }
}
