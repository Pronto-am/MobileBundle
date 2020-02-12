import Vue from 'vue'
import OAuthService from '../services/oauth.service';
import AuthService from '../services/auth.service';

Vue.prototype.$oauth = new OAuthService();
Vue.prototype.$auth = new AuthService();
