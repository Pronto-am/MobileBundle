import './bootstrap';
import Vue from 'vue';

import './plugins';
import './interceptors/axios';

import App from './views/App';

// import './libraries/auth';
// import './libraries/draggable';
import './libraries/element';
// import './libraries/fontawesome';
import './libraries/form';
// import './libraries/masonry';
import './libraries/moment';
import './libraries/progressbar';
import router from './libraries/router';
import './libraries/table';

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

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./components/', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)));

const app = new Vue({
  el: '#app',
  components: {App},
  router,

  mounted() {}
});
