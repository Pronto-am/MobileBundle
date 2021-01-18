/**
 * Simple form module
 */

module.exports = {
    init: function () {
        module.exports.validateRequiredFields();
    },
    validateRequiredFields: function () {
        $('form.validate-required-fields button[type="submit"]').click(function () {
            module.exports.removeInvalidAlerts();

            let valid = true;

            $('input[required]', $(this).closest('form')).each(function () {
                if ($(this).val() === '') {
                    module.exports.markInvalid($(this));

                    valid = false;
                }
            });

            $('select[required]', $(this).closest('form')).each(function () {
                if ($('option:selected', $(this)).attr('value') === '0') {
                    module.exports.markInvalid($(this).closest('.select-wrapper'));

                    valid = false;
                }
            });

            return valid;
        });
    },
    trackChanges: function (form) {
        $('input', form).each(function () {
            $(this).change(function () {
                form.addClass('changed');
            });
        });
    },
    hasChanged: function (form) {
        return form.hasClass('changed');
    },
    markInvalid: function (element, message) {
        let ul = $('<ul class="validation-message"><li>' + (typeof message !== 'undefined' ? message : translations.requiredField) + '</li></ul>');

        ul.insertBefore(element);

        element.addClass('invalid');

        if (element.parents('.language-card').length) {
            let language = element.closest('.language-card').attr('id');
            let tab = $('ul.tabs li.tab[data-language="' + language + '"]');

            if (!tab.hasClass('invalid')) {
                tab.addClass('invalid');
            }
        }
    },
    urlIsValid: function (url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    },
    markInconsistent: function (elements) {
        $(elements).each(function () {
            let ul = $('<ul class="validation-message message-inconsistent"><li>' + translations.inconsistentField + '</li></ul>');

            ul.insertBefore($(this));

            if ($(this).parents('.language-card').length) {
                let language = $(this).closest('.language-card').attr('id');
                let tab = $('ul.tabs li.tab[data-language="' + language + '"]');

                if (!tab.hasClass('inconsistent')) {
                    tab.addClass('inconsistent');
                }
            }
        });
    },
    createIdentifier: function (string) {
        return string.replace(/[áàâä]/g, 'a')
            .replace(/[úùûü]/g, 'u')
            .replace(/[éèêë]/g, 'e')
            .replace(/[íìîï]/g, 'i')
            .replace(/[óòôö]/g, 'o')
            .replace(/[ ]/g, '_')
            .replace(/[^a-z_\s]/gi, '').toLowerCase();
    },
    removeAlertsFromTabs() {
        $('ul.tabs li.tab').each(function () {
            $(this).removeClass('invalid');
            $(this).removeClass('inconsistent');
        });
    },
    removeInvalidAlerts(element) {
        if (typeof element !== 'undefined') {
            $('ul.validation-message', element).remove();
            $('input.invalid', element).removeClass('invalid');
        } else {
            $('ul.validation-message').remove();
            $('input.invalid').removeClass('invalid');
        }
    }
};
