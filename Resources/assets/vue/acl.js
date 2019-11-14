/**
 * ACL class to provide helper functions for the user and it's roles
 */
export default class ACL {

  /**
     * Initialize the ACL plugin
     */
  static async init() {
    try {
      const response = await axios.all([
        axios.get('/api/vue/users/profile'),
      ]);

      window.roles = response[0].data.data;
    } catch (error) {
      window.user = {};
    }
  }
}
