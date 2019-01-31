let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const src = 'Resources/assets/';
const dest = 'Resources/public/';

let img = {
    src: src + 'images/',
    dest: dest + 'images'
};

let js = {
    src: src + 'js/',
    dest: dest + 'js'
};

let css = {
    src: src + 'scss/',
    dest: dest + 'css'
};

// Compile and copy the assets to the public folder
mix.js(js.src + 'app.js', js.dest)
    .js(js.src + 'modal.js', js.dest)
    .js(js.src + 'error.js', js.dest)
    .js(js.src + 'login.js', js.dest)
    .js(js.src + 'trumbowyg.js', js.dest)
    .js(js.src + 'codeflask.js', js.dest)
    .js(js.src + 'jscolor.js', js.dest)
    .js(js.src + 'plugins.js', js.dest)

    .js(js.src + 'notifications/statistics.js', js.dest + '/notifications')
    .js(js.src + 'notifications/notifications.js', js.dest + '/notifications')

    .js(js.src + 'applications/applications.js', js.dest + '/applications')

    .js(js.src + 'customers/customers.js', js.dest + '/customers')

    .js(js.src + 'collections/collections.js', js.dest + '/collections')
    .js(js.src + 'collections/properties.js', js.dest + '/collections')
    .js(js.src + 'collections/entries.js', js.dest + '/collections')
    .js(js.src + 'collections/relationships.js', js.dest + '/collections')

    .js(js.src + 'translations/translations.js', js.dest + '/translations')

    .sass(css.src + 'login.scss', css.dest)
    .sass(css.src + 'app.scss', css.dest)
    .sass(css.src + 'error.scss', css.dest)
    .sass(css.src + 'trumbowyg.scss', css.dest)
    .sass(css.src + 'codeflask.scss', css.dest)
    .sass(css.src + 'select2.scss', css.dest)

    .sass(css.src + '/collections/collections.scss', css.dest + '/collections')

    .copy(img.src + '/logo-login.png', img.dest)
    .copy(img.src + '/logo-sidemenu.png', img.dest)
    .copy(img.src + '/favicon.ico', img.dest)
    .copy('Resources/assets/styles/customer.php', 'Resources/public/styles')
    .copy('Resources/assets/bundles/select2/js/select2.min.js', 'Resources/public/libraries/select2/js/select2.min.js')
    .copy('Resources/assets/bundles/jquery-ui/js/jquery-ui.min.js', 'Resources/public/libraries/jquery-ui/js/jquery-ui.min.js')

    .version()
    .setPublicPath(dest)
    .setResourceRoot('../');