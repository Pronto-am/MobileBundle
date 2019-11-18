import Vue from 'vue';
import VueProgressBar from 'vue-progressbar'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'

Vue.use(VueProgress);
Vue.use(VueProgressBar, {
    color: '#ffd600',
    failedColor: '#f5365c',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    }
});
