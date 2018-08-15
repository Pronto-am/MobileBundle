const swal = require('sweetalert');

module.exports = {
    confirm: function (title, html, callback, onCancel, confirmButtonText, cancelButtonText) {
        let options = {
            title: title,
            icon: 'warning',
            text: html,
            dangerMode: true,
            buttons: {
                cancel: {
                    text: typeof cancelButtonText !== 'undefined' ? cancelButtonText : translations.cancel,
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: typeof confirmButtonText !== 'undefined' ? confirmButtonText : translations.ok,
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        };

        swal(options).then((result) => {

            if (result) {
                if (typeof callback !== 'undefined') {
                    callback();
                }
            } else {
                if (typeof onCancel !== 'undefined') {
                    onCancel();
                }
            }
        });

        return false;
    },
    info: function (title, html) {
        swal({
            title: title,
            text: html,
            icon: 'info',
        });
    },
    warning: function (title, html) {
        swal({
            title: title,
            text: html,
            icon: 'warning',
            dangerMode: true
        });
    }
}