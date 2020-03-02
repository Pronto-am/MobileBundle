import Vue from 'vue'
import OAuthService from '../services/oauth.service';
import AuthService from '../services/auth.service';
import ApplicationService from '../services/application.service';

Vue.prototype.$oauth = new OAuthService();
Vue.prototype.$auth = new AuthService();
Vue.prototype.$application = new ApplicationService();
