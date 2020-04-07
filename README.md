# ProntoMobileBundle [![Build Status](https://travis-ci.com/Pronto-am/MobileBundle.svg?branch=master)](https://travis-ci.com/Pronto-am/MobileBundle)

Table of contents
=================

1. [Upgrading](#upgrading)
2. [Installation](#installation)
3. [Configuration](#mobilebundle-configuration)
4. [API Docs](#api-docs)

## 1. Upgrading

### From 1.* to 2.*

There are significant changes when upgrading to 2.0.0, especially regarding user authentication. From version 2, Pronto will be an SPA. This required us to expand the currently used OAuth authentication form only the app-endpoints to the CMS endpoints as well. A command has been made available to easily migrate the user data to the new required format. Before using this command, make sure you backup your database!

### What does it do?

1. It first creates a locally stored backup of relationships between access and refresh tokens, devices and app users.
2. Secondly, it migrates the app users to the users table.

### What do I need to do?

#### 1. Update packages yaml configuration files:

```yaml
# fos_oauth_server.yaml: Client class and user provider have been updated

fos_oauth_server:
    db_driver: orm
    client_class: Pronto\MobileBundle\Entity\OAuthClient
    access_token_class: Pronto\MobileBundle\Entity\AccessToken
    refresh_token_class: Pronto\MobileBundle\Entity\RefreshToken
    auth_code_class: Pronto\MobileBundle\Entity\AuthCode
    service:
        user_provider: Pronto\MobileBundle\Provider\UserProvider
```

```yaml
# security.yaml: References to AppUser have been removed and there's main firewall anymore

security:

    encoders:
        Pronto\MobileBundle\Entity\User: bcrypt

    access_control:
        - { path: ^/login, role: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/reset, role: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/admin/plugins, roles: [ROLE_SUPER_ADMIN] }
        - { path: ^/admin/customers, roles: [ROLE_SUPER_ADMIN] }
        - { path: ^/admin/notifications/segments, roles: [ROLE_SUPER_ADMIN] }
        - { path: ^/admin/users/app, roles: [ROLE_USER] }
        - { path: ^/admin/users, roles: [ROLE_ADMIN, ROLE_SUPER_ADMIN] }
        - { path: ^/admin, roles: ROLE_USER }

    providers:
        users:
            id: Pronto\MobileBundle\Provider\UserProvider


    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|scss|images|js)/
            security: false

        oauth_token:
            pattern: ^/oauth/v2/token
            security: false

        oauth_authorize:
            pattern: ^/oauth/v2/auth
            anonymous: true

        api:
            pattern: ^/api
            stateless: true
            anonymous: true
            fos_oauth: true
            provider: users
```

#### 2. Create/modify doctrine_migrations.yaml

Since version 2.*, the bundle uses the DoctrineMigrationBundle to migrate the database schema. If you're not using the bundle yet, create the configuration file, otherwise, add the path to the MobileBundle migrations:

```yaml
doctrine_migrations:
    name: 'Application Migrations'

    # List of namespace/path pairs to search for migrations, at least one required
    migrations_paths:
        'Pronto\MobileBundle\Migrations': '/vendor/pronto/mobilebundle/Migrations'

    # Run all migrations in a transaction.
    all_or_nothing: true
```

#### 2. Clear cache

To make sure changes in the configuration files are implemented:

```
php bin/console cache:clear
```

#### 3. Run migration:

```
php bin/console deployment:migrate
``` 

## 2. Installation

### Step 1. Install the skeleton

Open a command console and execute the following command to create a new project inside the folder: <package-name>:

```console
$ composer create-project pronto/mobile-skeleton <package-name>
```

This command requires you to have Composer installed globally, as explained
in the [installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.


### Step 2: Setup the database

Update your database connection inside the `.env` file to match your configuration:

```dotenv
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name
```

Then, create the database schema:

```console
$ php bin/console doctrine:schema:create
```

And run the fixtures to provide initial data:

```console
$ php bin/console doctrine:fixtures:load
```

This creates a first customer of the CMS, along with a super administrator.


### Step 5: Test logging in

When you ran `php bin/console doctrine:fixtures:load`, a customer with application and user account where created.

You can test your application by installing the web-server-bundle, which allows you to start a server and view your application at `http://localhost:8000`. You can do this by installing the web-server-bundle:

```console
$ composer require symfony/web-server-bundle --dev
```

And then running this command to start the server:

```console
$ php bin/console server:run
```

You can now check if you're able to login at `http://localhost:8000/login` with the following credentials: **admin@example.com** and password **admin**.


### Step 6: Setup Firebase integrations

We use Firebase to send our push notifications and store information in the Firebase database. This information contains sign-ins of devices and app users. At a regular interval, these records are being fetched from the Firebase database and updated into the database of the CMS. This method is used to prevent a lot of requests to your server. 

The CMS also stores notification templates in the cloud storage of Firebase. When a user receives a notification, there might be an html template which is being opened. That template is also retrieved from Firebase.

At last, APNS tokens need to be converted to Firebase tokens for iOS devices to be able to receive the notifications.

#### 6.1 Create a Firebase project

You can do this by going to [the Firebase Console](https://console.firebase.com) and logging in with your Google account. You can now create a new project. After you have done this, you will be redirected to the project overview. 

#### 6.2 Create a new private key

Click on the settings icon and choose "Project settings". Next, click on the tab "Service accounts". You now have the ability to create a new private key. When you click this button, a service-account file will be downloaded.

![Firebase project settings](https://cdn-images-1.medium.com/max/1800/1*1aRZ-Z32fyG6zv4zpvcZAw.png)

For the MobileBundle to connect to your Firebase project, you need to **rename** this file to: `google-service-account.json` and place it in the root of your project.


## 3. MobileBundle configuration

The MobileBundle configuration is available in the `config/packages/pronto_mobile.yaml` file. At the moment, there are not a lot of options here.

```yaml
pronto_mobile:
    domain: 'pronto.am'
    uploads_folder: 'uploads'

    firebase:
        storage_decryption_password: 'ThisValueIsNotSoSecret'
```

##### Domain name
The domain is important for sending the emails. The domain name you provide here is the domain mails are being send from. So, with the default value, mails are sent from: `noreply@pronto.am`.

##### Upoads folder
This option is quite obvious. You can specify in which folder the uploads are being stored. This also means that for now, the only storage option is local.

##### Firebase: Storage decryption password
This is the password that's being used to decrypt values from the logging table inside the Firebase Realtime Database. For obvious reasons, this value **needs** to be the same as the one you provide in the Android and iOS sdk of the MobileBundle. 


### Cronjobs

There are three cronjobs which need to run in the background to send push notifications, retrieve logging from Firebase and convert APNS tokens to Firebase tokens. Below are the commands you need to register on your server for these tasks to be executed in the background. You are free to change the interval at which they are executed.

```console
crontab -e
```
```console
*    * * * * php /path/to/project/bin firebase:notifications:send   // every minute
*/15 * * * * php /path/to/project/bin firebase:database:logs        // every 15 minutes
*/15 * * * * php /path/to/project/bin firebase:tokens:convert       // every 15 minutes
```

## 4. API Docs

### Postman
A [public Postman collection](https://documenter.getpostman.com/view/7226788/SVzw3zwg) is available, with the currently available API routes.

### APIDoc JS
The MobileBundle uses [apidocjs](http://apidocjs.com) to generate API docs. The docs are located inside the `public/apidoc` folder.

#### OAuth2

The API docs don't list the routes for OAuth. The Android and Mobile sdk of the MobileBundle both use OAuth to connect to the API. If you're not familiar with OAuth, I suggest you visit [https://www.oauth.com](https://www.oauth.com) to get yourself up to date.

The routes for requesting an access token is: `https://yourdomain.app/oauth/v2/token`. You can request an access token by using the client credentials, or using the username and password combination of an app user.

##### Request access token: Client Credentials 
Documentation:[https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)

```
[POST] https://yourdomain.app/oauth/v2/token
 
{
	"grant_type": "client_credentials",
	"client_id": "1_66e8vp2mt2sccosk4w0ogswogsgww4wsokcw4wsc80w4s00woc",
	"client_secret": "5s6e0r58qn8k0wggk808ogss4g08kgs0w8wgo84cc4s84sw4ck"
}
```

##### Request access token: Username and password 
Documentation:[https://www.oauth.com/oauth2-servers/access-tokens/password-grant/](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)

```
[POST] https://yourdomain.app/oauth/v2/token
 
{
	"grant_type": "password",
	"username": "user@example.com",
	"password": "1234luggage",
	"client_id": "1_66e8vp2mt2sccosk4w0ogswogsgww4wsokcw4wsc80w4s00woc",
	"client_secret": "5s6e0r58qn8k0wggk808ogss4g08kgs0w8wgo84cc4s84sw4ck"
}
```
