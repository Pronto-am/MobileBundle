<?php

namespace Pronto\MobileBundle;

use Composer\Script\Event;
use Symfony\Component\Yaml\Yaml;

class Scripts
{
    /**
     * @param $event
     */
    public static function postCreateProject(Event $event): void
    {
        $vendorDir = $event->getComposer()->getConfig()->get('vendor-dir');
        $packagesDir = $vendorDir . '/../config/packages/';
        $routesDir = $vendorDir . '/../config/routes/';

        // Modify the contents of the YAML files
        self::modifyProntoMobileConfiguration($packagesDir);
        self::modifyFosOauthServerConfiguration($packagesDir);
        self::modifySecurityConfiguration($packagesDir);
        self::modifyTwigConfiguration($packagesDir);

        self::addRoutes($routesDir);
    }

    /**
     * @param string $packagesDir
     */
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

    /**
     * @param string $packagesDir
     */
    private static function modifyFosOauthServerConfiguration(string $packagesDir): void
    {
        $fileName = $packagesDir . '/fos_oauth_server.yaml';

        $fosOAuth = [
            'fos_oauth_server' => [
                'db_driver'           => 'orm',
                'client_class'        => 'Pronto\MobileBundle\Entity\Application',
                'access_token_class'  => 'Pronto\MobileBundle\Entity\AccessToken',
                'refresh_token_class' => 'Pronto\MobileBundle\Entity\RefreshToken',
                'auth_code_class'     => 'Pronto\MobileBundle\Entity\AuthCode',
                'service'             => [
                    'user_provider' => 'Pronto\MobileBundle\Provider\AppUserProvider'
                ]
            ]
        ];

        file_put_contents($fileName, Yaml::dump($fosOAuth, 4));
    }

    /**
     * @param string $routesDir
     */
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

    /**
     * @param string $packagesDir
     */
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

    /**
     * @param string $packagesDir
     */
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

        $security['security']['encoders'] = [
            'Pronto\MobileBundle\Entity\User'    => 'bcrypt',
//            'Pronto\MobileBundle\Entity\AppUser' => 'bcrypt'
        ];

        $security['security']['firewalls'] = [
            'dev' => $security['security']['firewalls']['dev'],

            'oauth_token' => [
                'pattern'  => '^/oauth/v2/token',
                'security' => false
            ],

            'oauth_authorize' => [
                'pattern'  => '^/oauth/v2/auth',
                'security' => true
            ],

            'api' => [
                'pattern'   => '^/api',
                'fos_oauth' => true,
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
}
