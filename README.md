Installation
============

### Step 1. Install the skeleton

Open a command console and execute the following command to create a new project inside the folder: <package-name>:

```console
$ composer create-project pronto/mobile-skeleton <package-name>
```

This command requires you to have Composer installed globally, as explained
in the [installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

### Step 2: Enable the Bundle

Next, open the folder in your command console and install the MobileBundle:

```console
$ composer require pronto/mobilebundle
```

Applications which use Symfony Flex are done after this step. For those who don't, you have to add the Bundle manually to the `src/Kernel.php` file:


### Step 3: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `src/Kernel.php` file of your project:

```php
<?php
// src/Kernel.php
 
// ...
 
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            new Pronto\MobileBundle\ProntoMobileBundle(),
        );

        // ...
    }

    // ...
}
```


### Step 4: Setup the database

Create the database schema:

```console
$ php bin/console doctrine:schema:create
```

And run the fixtures to provide initial data:

```console
$ php bin/console doctrine:fixtures:load
```

This creates a first customer of the CMS, along with a super administrator. You are now able to login using: **admin@example.com** and password **admin**.


Configuration
=============

### ENV file

Update your database connection inside the `.env` file to match your configuration:

```dotenv
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name
```



### MobileBundle configuration

The MobileBundle configuration is available in the `config/packages/pronto_mobile.yaml` file. At the moment, there are not a lot of options here. But you can configure your domain name, uploads folder and decryption password for the Firebase storage database records.


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

### Firebase

We use Firebase to send our push notifications and store information in the Firebase database. This information contains sign-ins of devices and app users. At a regular interval, these records are being fetched from the Firebase database and updated into the database of the CMS. This method is used to prevent a lot of requests to your server. 

The CMS also stores notification templates in the cloud storage of Firebase. When a user receives a notification, there might be an html template which is being opened. That template is also retrieved from Firebase.

At last, APNS tokens need to be converted to Firebase tokens for iOS devices to be able to receive the notifications.

For all of this to work, you need to download a `google-service-account.json` file from your Firebase project and place it in the root of the project. The MobileBundle will auto detect it's presence and is then able to use the Firebase services.