import Vue from 'vue';
import Cookies from 'js-cookie';
import helpers from './helpers';

Vue.mixin({
    computed: {
        availableLanguages: function() {
            let application = Vue.prototype.$application.getApplication();

            if(application === null) {
                return [];
            }

            return application.available_languages;
        },

        availablePlugins: function() {
            let application = Vue.prototype.$application.getApplication();

            if(application === null) {
                return [];
            }

            return application.application_plugins.filter(plugin => plugin.active).map(plugin => plugin.plugin.identifier);
        }
    },

    filters: {
        capitalize: function (value) {
            if (!value) {
                return '';
            }

            value = value.toString();

            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },

    methods: {
        path: window.path,
        submitSuccess: function () {
            this.$notify.success({
                title: Vue.prototype.$t('titles.success'),
                message: Vue.prototype.$t('messages.submitted_successfully')
            });
        },
        submitError: function (error) {
            if (!error.errors) {
                this.$notify.error({
                    title: Vue.prototype.$t('titles.error'),
                    message: Vue.prototype.$t('messages.something_went_wrong')
                });
            }
        },
        confirm: function (text, title, confirmButtonText = 'Verwijderen') {
            return this.$confirm(text, title, {
                confirmButtonText: confirmButtonText,
                cancelButtonText: 'Annuleren',
                type: 'warning',
                dangerouslyUseHTMLString: true
            });
        },
        isEmpty(value) {
            return value === '' || value === null || value === undefined;
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        downloadFile(url, method = 'get', data = {}) {
            axios({
                url: url,
                method: method,
                data: data,
                responseType: 'blob'
            }).then(response => {
                let fileName = '';
                const disposition = response.headers['content-disposition']

                if (disposition && disposition.indexOf('attachment') !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    let matches = filenameRegex.exec(disposition);

                    if (matches[1]) {
                        fileName = matches[1].replace(/['"]/g, '');
                    }
                }

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', fileName); //or any other extension

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            });
        }
    }
});

Vue.filter('capitalize', function (value) {
    if (!value) {
        return '';
    }

    value = value.toString();

    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('round', function (value) {
    return Math.round(value * 100) / 100;
});

Vue.filter('translatable', function (value) {
    if(value == null) {
        return '';
    }

    const selectedLocale = Cookies.get('selected_locale') ? Cookies.get('selected_locale') : 'en';
    const keys = Object.keys(value);

    if(keys.length === 0) {
        return '';
    }

    if(value[selectedLocale] != null && value[selectedLocale] !== '') {
        return value[selectedLocale];
    }

    let application = Vue.prototype.$application.getApplication();

    if(application != null && value[application.default_language] != null && value[application.default_language] !== '') {
        return value[application.default_language];
    }

    return value[keys[0]];
});

Vue.directive('user-has-role', function (el, bindings, vnode) {
    const behaviour = bindings.modifiers.disable ? 'disable' : 'hide';

    if (!Vue.prototype.$auth.userHasRole(bindings.value)) {
        if (behaviour === 'hide') {
            helpers.commentNode(el, vnode);
        } else if (behaviour === 'disable') {
            el.disabled = true;
        }
    }
});


/**
 * PROTOTYPES
 */

// Events prototype
Vue.prototype.$events = new Vue();


/**
 * Prototype to create a url
 * @param url
 * @param params
 * @returns {string}
 */
Vue.prototype.$path = (url, params = {}) => {
    let keys = Object.keys(params);

    for (let key of keys) {
        url = url.replace(`:${key}`, params[key]);
    }

    return `/api/vue/${url.replace(/^\/+/g, '')}`;
};
