require('../bundles/prism/js/prism');

let codeFlask = require('codeflask/src/codeflask.js');

module.exports = {
    /**
     * Initialize the codeflask plugin for the plugin edit view
     */
    initPushNotifications: function () {
        let flask = new codeFlask;

        flask.run('.code-mirror', {
            rtl: false,
            language: 'html'
        });

        $('button[type="submit"]').click(function () {
            $('textarea[name="' + $('.code-mirror').attr('id') + '"]').val($('.code-mirror').find('textarea').val());
        });

        flask.onUpdate(function (code) {
            module.exports.setIframeContent(code);
        });

        module.exports.setIframeContent($('.code-mirror').find('textarea').val());
    },


    /**
     * Set the iframe content
     *
     * @param code
     */
    setIframeContent: function (code) {
        let iframe = $('.html-preview .content iframe')[0];

        if (typeof iframe === 'undefined') {
            return;
        }

        let document = iframe.contentWindow.document;

        document.open();
        document.close();

        $('body', document).html(code);
    },


    /**
     * Initialize the codeflask plugin for the property edit view
     */
    initProperties: function () {
        let flask = new codeFlask;
        flask.runAll('.codeflask', {
            language: 'html',
            rtl: false
        });
    }
};
