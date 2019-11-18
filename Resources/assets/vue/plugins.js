import Vue from 'vue';
import acl from './acl';
import helpers from './helpers';

Vue.mixin({
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
    route: function(url, params = {}) {
      let keys = Object.keys(params);

      for(let key of keys) {
        url = url.replace(`:${key}`, params[key]);
      }

      return `/api/vue/${url.replace(/^\/+/g, '')}`;
    },
    submitSuccess: function () {
      this.$message({
        type: 'success',
        message: 'De gegevens zijn opgeslagen'
      })
    },
    submitError: function () {
      this.$message({
        type: 'error',
        message: 'Er is iets mis gegaan, probeer het nogmaals'
      })
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

Vue.directive('user-can', function (el, bindings, vnode) {
  const behaviour = bindings.modifiers.disable ? 'disable' : 'hide';

  if (!acl.userCan(bindings.value)) {
    if (behaviour === 'hide') {
      helpers.commentNode(el, vnode)
    } else if (behaviour === 'disable') {
      el.disabled = true
    }
  }
});
