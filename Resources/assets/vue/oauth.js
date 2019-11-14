import AuthService from './oauth.service';
import Cookies from 'js-cookie';

export default class {

  /**
     * Constructor
     */
  constructor() {
    this.session = Cookies;
  }

  /**
     * Logout
     */
  logout() {
    AuthService.destroySession();

    this.session.remove('access_token');
    this.session.remove('refresh_token');
  }

  /**
     * Guest check
     * @returns {boolean}
     */
  guest() {
    return this.session.get('access_token') === undefined;
  }

  /**
     * Check if user is logged in
     * @returns {boolean}
     */
  isAuthenticated() {
    return this.session.get('access_token') !== undefined;
  }

  /**
     * Login using username and password
     * @param username
     * @param password
     * @returns {Promise<any>}
     */
  login(username, password) {
    return new Promise((resolve, reject) => {
      AuthService.attemptLogin({
        username: username,
        password: password
      }).then(response => {
        this.storeSession(response.data);
        this.addAuthHeaders();

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
     * Refresh the access token of the user
     * @returns {Promise<any>}
     */
  refreshToken() {
    return new Promise((resolve, reject) => {
      AuthService.attemptLogin({
        refresh_token: this.session.get('refresh_token')
      }).then(response => {
        this.storeSession(response.data);
        this.addAuthHeaders();

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
     * Get the user from the API
     * @returns {Promise<any>}
     */
  getUser() {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        AuthService.currentUser().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    }

    return new Promise(resolve => resolve(null))
  }

  /**
     * Get the authentication header
     * @returns {*}
     */
  getAuthHeader() {
    if (this.isAuthenticated()) {
      let access_token = this.getItem('access_token');

      return 'Bearer ' + access_token
    }

    return null
  }

  /**
     * Get an item from the cookies
     * @param key
     */
  getItem(key) {
    return this.session.get(key);
  }

  /**
     * Add auth headers to the requests
     */
  addAuthHeaders() {
    let header = this.getAuthHeader();

    AuthService.addAuthorizationHeader(header)
  }

  /**
     * Store the session data
     * @param data
     */
  storeSession(data) {
    let hourInMilliSeconds = 86400;
    let time = data.expires_in / hourInMilliSeconds;

    this.session.set('access_token', data.access_token, {
      expires: time,
    });

    this.session.set('refresh_token', data.refresh_token, {
      expires: time * 2,
    });
  }

}
