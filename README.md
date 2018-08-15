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