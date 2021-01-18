# UPGRADE_GUIDE

## v1.* to v2.*

This change is breaking for your currently logged in app users. A switch from friends-of-symfony/oauth-server-bundle to triker/oauth2-bundle was neccessary because the first one is not being maintained anymore.

### Remove legacy configuration 
Remove the reference of the former used dependency `friendsofsymfony/oauth2-server-bundle` from `bundles.php`:

```suggestion
- FOS\OAuthServerBundle\FOSOAuthServerBundle::class => ['all' => true],
+ Trikoder\Bundle\OAuth2Bundle\TrikoderOAuth2Bundle::class => ['all' => true],
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

Also make sure your `.env` file contains the `OAUTH2_ENCRYPTION_KEY` key. You can create a key using:

```
php -r 'echo base64_encode(random_bytes(32)), PHP_EOL;'
```

#### `security.yaml`

```yaml
security:
    firewalls:
        api:
-           fos_oauth:  true
+           oauth2: true
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
Publish a migrations file or run migrastions directly to create the new oauth2 tables.

### Migrate existing clients
The information of the existing clients which are linked to the `Application`, is still available. We need to migrate this info and create new OAuth clients. Do so by running the upgrade assistent:

```
php bin/console pronto:upgrade:assist 2.0.0
```
