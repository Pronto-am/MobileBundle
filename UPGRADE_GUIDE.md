# UPGRADE_GUIDE

## v1.* to v2.*

This change is breaking for your currently logged in app users. A switch from friends-of-symfony/oauth-server-bundle to triker/oauth2-bundle was neccessary because the first one is not being maintained anymore.

### Update `bundles.php` 
Remove the reference of 

```suggestion
- FOS\OAuthServerBundle\FOSOAuthServerBundle::class => ['all' => true],
+ Trikoder\Bundle\OAuth2Bundle\TrikoderOAuth2Bundle::class => ['all' => true],
```

### Upgrade
Update `composer.json` to use the new version:

```suggestion
- "pronto/mobilebundle": "^1.0",
+ "pronto/mobilebundle": "^2.0",
```

Run `composer update`.

### Upgrade package config

The newly required oauth2 bundle requires configuration in your `packages` dir. Replace the contents of the created file with:
Modify the locations of the private and public keys to your needs. Also make sure your `.env` file contains the `OAUTH2_ENCRYPTION_KEY` key. 

```yaml
trikoder_oauth2:
    authorization_server:
        private_key: '%kernel.project_dir%/config/security/oauth/private.key'
        private_key_passphrase: null
        encryption_key: '%env(string:OAUTH2_ENCRYPTION_KEY)%'
        access_token_ttl: PT1H
        refresh_token_ttl: P1M
        auth_code_ttl: PT10M
        require_code_challenge_for_public_clients: null
        enable_auth_code_grant: false
        enable_client_credentials_grant: false
        enable_implicit_grant: false
        enable_password_grant: false
        enable_refresh_token_grant: false
    resource_server:
        public_key: '%kernel.project_dir%/config/security/oauth/public.key'
    scopes: {  }
    persistence:
        doctrine:
            entity_manager: default
    exception_event_listener_priority: 10
    role_prefix: ROLE_OAUTH2_
```

You also need to update the doctrine configuration. The new bundle limits the length of the identifier, which is too short for our existing clients. Override the mapping of the bundle:

```yaml
doctrine:
    orm:
        mapping:
            TrikoderOAuth2Bundle:
                mapping: true
                type: xml
                dir: '%kernel.root_dir%/../app/Resources/config/TrikoderOAuth2Bundle'
                alias: 'JMSPaymentCoreBundle'
                prefix: 'JMS\Payment\CoreBundle\Entity'
```

### Update your database
Publish a migrations file or run migrastions directly to create the new oauth2 tables.

### Migrate existing clients
The information of the existing clients which are linked to the `Application`, is still available. We need to migrate this info and create new OAuth clients. Do so by running the upgrade assistent:
