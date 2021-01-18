const sweetalert = require('../sweetalert');

require('trumbowyg');

$.trumbowyg.svgPath = '/trumbowyg/icons.svg';

$('.trumbowyg').trumbowyg({
    autogrowOnEnter: true,
    imageWidthModalEdit: true
}).on('tbwchange', function () {
    htmlEditorChanged($(this));
});


/**
 * Global HTMl editor change function
 *
 * @param trumbowyg
 */
function htmlEditorChanged(trumbowyg) {
    let text = trumbowyg.val();

    let template = $('textarea#html-template').val();

    let webview = template.replace('{{ CONTENT }}', text);

    let row = trumbowyg.closest('.row');

    let iframe = row.find('.html-preview .content iframe')[0].contentWindow.document;

    iframe.open();
    iframe.close();

    $('body', iframe).html(webview);
}


$(document).ready(function () {

    // Remove materialize styling
    $('.trumbowyg-modal-box input').each(function () {
        $(this).addClass('browser-default');
    });


    // Fire change event, to fill the iFrame
    $('.trumbowyg').each(function () {
        htmlEditorChanged($(this));
    });


    /**
     * Define the functionality to listen to the scheduling event
     */
    let scheduleCheckbox = $('#push_notification_form_schedule');

    scheduleCheckbox.change(function () {
        if ($(this).prop('checked')) {
            $('.schedule').show();
            $('.sendnow').hide();
        } else {
            $('.schedule').hide();
            $('.sendnow').show();
        }
    });

    scheduleCheckbox.trigger('change');


    /**
     * Define the functionality to listen to the testing event
     */
    let testingCheckbox = $('#push_notification_form_test');

    testingCheckbox.change(function () {
        if ($(this).prop('checked')) {
            $('.test').show();
        } else {
            $('.test').hide();
        }
    });

    testingCheckbox.trigger('change');


    /**
     * Show the sweet alert confirmation dialog
     */
    $('#push_notification_form_sendNow, #push_notification_form_sendLater').click(function () {
        // Reset the tabs to the 'valid' state
        forms.removeAlertsFromTabs();

        if (!formIsValid()) {
            sweetalert.warning(translations.invalidFormTitle, translations.invalidFormContent);

            return false;
        }

        if (!formIsConsistent()) {
            // Show an alert and let the user change the fields or confirm by clicking 'send' again
            sweetalert.confirm(translations.inconsistentTitle, translations.inconsistentContent, function () {
                submitForm();
            }, undefined, translations.sendAnyway);
        } else {
            submitForm();
        }

        return false;
    });


    /**
     * Validate the form
     *
     * @returns {boolean}
     */
    function formIsValid() {
        let valid = true;

        $('ul.validation-message:not(.message-inconsistent)').remove();
        $('input.invalid').removeClass('invalid');

        let fallback = $('.is-fallback-language');

        if (fallback.find('input.title').val() === '') {
            forms.markInvalid(fallback.find('input.title'));

            valid = false;
        }

        $('input.title, input.content').each(function () {
            if ($(this).val().length > $(this).data('length')) {
                forms.markInvalid($(this), translations.maximumCharacterCountExceeded);

                valid = false;
            }
        });

        let clickAction = $('select.click-action').val();

        if (clickAction == 1) {
            if (fallback.find('input.click-action-url').val() === '') {
                forms.markInvalid(fallback.find('input.click-action-url'));

                valid = false;
            }

            // Add http before a url if it's not present
            $('input.click-action-url').each(function () {
                if ($(this).val() !== '' && !/^https?:\/\//.test($(this).val())) {
                    $(this).val('http://' + $(this).val());
                }
            });
        }

        if (clickAction == 2 && fallback.find('textarea.click-action-html').val() === '') {
            forms.markInvalid(fallback.find('.trumbowyg-box'));

            valid = false;
        }

        let segment = $('#push_notification_form_segment');

        if (segment.val() === '') {
            forms.markInvalid(segment.closest('.select-wrapper'));

            valid = false;
        }

        if ($('input#push_notification_form_schedule').is(':checked')) {
            let date = $('input#push_notification_form_scheduledSending_date');
            let time = $('input#push_notification_form_scheduledSending_time');

            if (date.val() === '') {
                forms.markInvalid(date);

                valid = false;
            }

            if (time.val() === '') {
                forms.markInvalid(time);

                valid = false;
            }

            let dateRegex = /[0-3]{1}[0-9]{1}-[0-1]{1}[0-9]{1}-[2-9]{1}[0-9]{3}/;
            let timeRegex = /[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/;

            if (date.val() !== '' && !dateRegex.test(date.val())) {
                forms.markInvalid(date, translations.invalidFormat);

                valid = false;
            }

            if (time.val() !== '' && !timeRegex.test(time.val())) {
                forms.markInvalid(time, translations.invalidFormat);

                valid = false;
            }
        }

        return valid;
    }


    /**
     * Validate the form on consisteny
     *
     * @returns {boolean}
     */
    function formIsConsistent() {
        let consistent = true;

        $('ul.message-inconsistent').remove();

        // Get the total amount of languages
        let languageCount = $('li.tab').length;

        let titleCount = languageCount - countEmptyFields('input.title');

        // User has not provided a title for all languages
        if (titleCount > 0 && titleCount < languageCount) {
            forms.markInconsistent('input.title');

            consistent = false;
        }

        let contentCount = languageCount - countEmptyFields('input.content');

        // User has not provided a title for all languages
        if (contentCount > 0 && contentCount < languageCount) {
            forms.markInconsistent('input.content');

            consistent = false;
        }

        let clickAction = $('select.click-action').val();

        if (clickAction > 0) {
            // Get the element according to the selected value
            let element = clickAction === '1' ? 'input.click-action-url' : 'textarea.click-action-html';
            let isHtml = clickAction === '2';

            let clickActionCount = languageCount - countEmptyFields(element);

            // User has not provided a click action for all languages
            if (clickActionCount > 0 && clickActionCount < languageCount) {
                // Get the correct element for the message placement
                let beforeElement = isHtml ? '.trumbowyg-box' : element;

                forms.markInconsistent(beforeElement);

                consistent = false;
            }
        }

        return consistent;
    }


    /**
     * Submit the notification form
     */
    function submitForm() {
        $('.loader-container:not(.page-loader-container)').fadeIn(200);

        let html = translations.confirmationContent + '\n\n';

        $.ajax({
            url: notificationDeviceCountUrl,
            type: 'post',
            data: {
                segment: $('#push_notification_form_segment').val(),
                test: $('#push_notification_form_test:checked').length > 0,
                testDevices: $('.row.test table tbody input:checkbox:checked').map(function () {
                    return $(this).val();
                }).get()
            },
            success: function (response) {
                $('.loader-container:not(.page-loader-container)').fadeOut(200);

                if ($('#push_notification_form_segment').val() == 0 || typeof $('#push_notification_form_segment').val() === 'undefined') {
                    let isTest = $('#push_notification_form_test:checked').length > 0;
                    let translated = isTest ? translations.selectedTestDevices : translations.allDevices;

                    html += translations.segment + ': ' + translated + '\n';
                } else {
                    html += translations.segment + ': ' + $('#push_notification_form_segment option:selected').text() + '\n';
                }

                html += translations.deviceCount + ': ' + response.data.recipients + '\n';

                sweetalert.confirm(translations.confirmTitle, html, function () {
                    $('.loader-container:not(.page-loader-container)').fadeIn(200);

                    $('form[name="push_notification_form"]').submit();
                });
            }
        });
    }


    /**
     * Count the number of empty fields
     *
     * @param field
     * @returns {jQuery}
     */
    function countEmptyFields(field) {
        return $(field).filter(function () {
            return !$(this).val();
        }).length;
    }
});
