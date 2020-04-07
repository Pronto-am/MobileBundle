import './bootstrap';
import Vue from 'vue';
import './plugins';
import './interceptors/axios';
import App from './views/App';

import './libraries/auth';
import i18n from './libraries/i18n';
import './libraries/draggable';
import './libraries/element';
import './libraries/fontawesome';
import './libraries/form';
import './libraries/moment';
import './libraries/progressbar';
import router from './libraries/router';
import './libraries/table';
import './libraries/fixedheader';

window.Vue = Vue;
window.Events = new Vue();

// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';

// if(process.env.NODE_ENV === 'production') {
// // Init Sentry
//     Sentry.init({
//         dsn: 'https://3a4cd544b8874acf8325aa7b266139c9@sentry.io/129314',
//         integrations: [new Integrations.Vue({Vue, attachProps: true})],
//     });
// }

// Wait for the AUTH and Application services to be initialized
Promise.all([
    Vue.prototype.$auth.init(),
    Vue.prototype.$application.init()
]).then(() => {
    // ./components/ExampleComponent.vue -> <example-component></example-component>
    const files = require.context('./components/', true, /\.vue$/i);
    files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

    new Vue({
        el: '#app',
        components: {App},
        router,
        i18n,
    });
});
