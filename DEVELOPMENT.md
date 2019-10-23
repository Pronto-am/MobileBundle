# ProntoMobileBundle [![Build Status](https://travis-ci.com/Pronto-am/MobileBundle.svg?branch=master)](https://travis-ci.com/Pronto-am/MobileBundle)

Table of contents
=================

1. [Installation](#installation)
2. [Asset compiling](#asset-compiling)

Installation
============

Install this bundle in a clean Symfony project, and run every command from within that project. The bundle needs to be installed as a symlinked package to be able to see changes.

### Step 1. Create the project

Open a command console and execute the following command to create a new project inside the folder: <package-name>:

```console
$ composer create-project pronto/mobile-skeleton <package-name> # for instance: MobileDev
```

### Step 2. Clone the MobileBundle

Clone the MobileBundle in a separate directory, to be able to use it as a local package.

```console
$ git clone git@github.com:Pronto-am/MobileBundle.git MobileBundle
```

## Step 3. Change composer.json

Change the `composer.json` file of the Skeleton, so the MobileBundle is used as local reference:

```json
"repositories": [
    {
        "type": "path",
        "url": "../MobileBundle",
        "symlink": true
    }
]
```

### Step 4: Reinstall composer dependencies

Remove the `vendor` directory and `composer.lock` file, and reinstall all composer dependencies.

### Step 5. Update database

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

### Step 6. Symlink assets

Reinstall the bundle assets in the skeleton project by using as symlinks. This way, changes to asset files are updated in the skeleton project. 

Asset compiling
===============

#### Compile JS and SCSS files

##### Watch changes in files
```console
## From MobileBundle directory, run asset compiler:
$ cd ../MobileBundle npm run watch
 
## Then, from the local development directory, install the compiled assets via symlink
$ cd ../MobileDev && php bin/console assets:install --symlink
```

##### Create production ready files
```console
$ npm run production
```

APIDoc generation
=================

```console
apidoc -i Controller/Api/ -o Resources/public/apidoc/
```
