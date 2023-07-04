import './bootstrap';
import Vue from 'vue';
import './extensions';
import './plugins';
import './prototypes';

import './libraries/bit/form';
import './libraries/bit/table';
import i18n from './libraries/i18n';
import './libraries/element';

import '../sass/app.scss';

// Components
import Index from './views/translations';
Vue.component(Index.name, Index);

if (Vue.prototype.$inProduction) {
    console.log = () => {
    };
    console.debug = () => {
    };
    console.warning = () => {
    };
}

window.Vue = Vue;

new Vue({
    el: '#vue-app',
    i18n
});
