# UPGRADE_GUIDE

## v1.* to v2.*

This change is breaking for your currently logged in app users. A switch from friends-of-symfony/oauth-server-bundle to triker/oauth2-bundle was neccessary because the first one is not being maintained anymore.

### Remove legacy configuration

Remove the reference of the former used dependency `friendsofsymfony/oauth2-server-bundle` from `bundles.php`:

```suggestion
- FOS\OAuthServerBundle\FOSOAuthServerBundle::class => ['all' => true],
+ League\Bundle\OAuth2ServerBundle\LeagueOAuth2ServerBundle::class => ['all' => true],
```

And delete the yaml config file of the bundle.

### Upgrade

Update `composer.json` to use the new version:

```suggestion
- "pronto/mobilebundle": "^1.0",
+ "pronto/mobilebundle": "^2.0",
```

Run `composer update`.

### Clear cache

Completely delete your cache directory, because the bundle now resides inside a `src/` directory.

### Upgrade config

The newly required oauth2 bundle requires configuration in your `packages` dir. Replace the contents of the created file with:
Modify the locations of the private and public keys to your needs.

```yaml
league_oauth2_server:
  authorization_server:
    private_key: '%kernel.project_dir%/config/security/oauth/private.key'
    private_key_passphrase: 'passphrase'

    encryption_key: '%env(string:OAUTH2_ENCRYPTION_KEY)%'
    encryption_key_type: plain # One of "plain"; "defuse"

    access_token_ttl: PT1H
    refresh_token_ttl: P1M
    auth_code_ttl: PT10M

    enable_client_credentials_grant: true
    enable_password_grant: true
    enable_refresh_token_grant: true
    enable_auth_code_grant: false

    require_code_challenge_for_public_clients: false

    persist_access_token: true

  resource_server:
    public_key: '%kernel.project_dir%/config/security/oauth/public.key'

  scopes:
    available: [ 'basic' ]
    default: [ 'basic' ]

  persistence:
    doctrine:
      entity_manager: default

  role_prefix: ROLE_OAUTH2_

  client:
    classname: League\Bundle\OAuth2ServerBundle\Model\Client
```

Also make sure your `.env` file contains the `OAUTH2_ENCRYPTION_KEY` key. You can create a key using:

```
php -r 'echo base64_encode(random_bytes(32)), PHP_EOL;'
```

#### `security.yaml`

Modify the `security.yaml` file to reflect the changes below. It's been updated to use the new authentication system of Symfony.

```yaml
security:
+ enable_authenticator_manager: true

  password_hashers:
    legacy_bcrypt:
      algorithm: bcrypt

    Pronto\MobileBundle\Entity\User:
      algorithm: sodium
      migrate_from:
        # Allow existing bcrypt accounts to log in and migrate to sodium
        - legacy_bcrypt

    Pronto\MobileBundle\Entity\AppUser:
      algorithm: sodium
      migrate_from:
        # Allow existing bcrypt accounts to log in and migrate to sodium
        - legacy_bcrypt

  firewalls:
    api:
-     fos_oauth: true
+     oauth2: true
-     pattern: ^/api
+     pattern: ^/(api|bundles/prontomobile)

    main:
      switch_user: { role: ROLE_SUPER_ADMIN, parameter: _switch_user }
      provider: cms_users

      custom_authenticators:
        - Pronto\MobileBundle\Security\LoginFormAuthenticator

      logout:
        path: /logout
        target: /login
``` 

### Create keys

Private key:

```
openssl genrsa -aes128 -passout pass:_passphrase_ -out config/security/oauth/private.key 2048
```

Public key:

```
openssl rsa -in config/security/oauth/private.key -passin pass:_passphrase_ -pubout -out config/security/oauth/public.key
```

### Update your database

Publish a migrations file or run migrations directly to create the new oauth2 tables.

### Migrate existing clients

The information of the existing clients which are linked to the `Application`, is still available. We need to migrate this info and create new OAuth clients. Do so by running the upgrade assistent:

```
php bin/console pronto:upgrade:assist 2.0.0
```
