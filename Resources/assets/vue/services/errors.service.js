import Vue from 'vue';
import i18n from "../libraries/i18n";

export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

export const Error = {
    unknown: 'something_went_wrong',
    wrongCredentials: 'wrong_credentials',
};

export default class ErrorService {

    get roles() {
        return {
            USER: ROLE_USER,
            ADMIN: ROLE_ADMIN,
            SUPER_ADMIN: ROLE_SUPER_ADMIN,
        }
    };

    notify(error) {
        let title = i18n.tc('titles.error');
        let key = 'messages.error_' + error;
        let message = i18n.tc(key);

        Vue.prototype.$notify.error({
            title: title,
            message: message
        });
    }
}
