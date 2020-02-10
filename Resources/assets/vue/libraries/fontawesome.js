import Vue from 'vue';
import {library, dom} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

// Watch <i> tags and transform them to SVG for font awesome icons
dom.watch();

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
