import Vue from 'vue'

Vue.prototype.$inProduction = process.env.NODE_ENV === 'production';
