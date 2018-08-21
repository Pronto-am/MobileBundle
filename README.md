# ProntoMobileBundle [![Build Status](https://travis-ci.com/Pronto-am/MobileBundle.svg?branch=master)](https://travis-ci.com/Pronto-am/MobileBundle)

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

### Step 2: Install the MobileBundle

Next, open the folder in your command console and install the MobileBundle:

```console
$ composer require pronto/mobilebundle
```

If your application uses Symfony Flex, you can skip the next step and continue with step 4.


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


### MobileBundle configuration

The MobileBundle configuration is available in the `config/packages/pronto_mobile.yaml` file. At the moment, there are not a lot of options here.

```yaml
pronto_mobile:
    domain: 'pronto.am'
    uploads_folder: 'uploads'

    firebase:
        storage_decryption_password: 'thisshouldbechanged'
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