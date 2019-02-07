$('a.btn-translate').click(function (e) {
    e.preventDefault();

    const defaultValue = $('#translations_0').html();
    const fieldToFill = $(this).closest('.row').find('div[contenteditable][id^="translations_"]');
    const from = $('#translations_0').data('lang');
    const to = fieldToFill.data('lang');

    $(this).addClass('disabled');
    $(fieldToFill).prop('disabled', true);

    translate(from, to, defaultValue, function (response) {
        if (response.text && response.text.length > 0) {
            fieldToFill.html(response.text[0]);
        }
    });

    $(this).removeClass('disabled');
    $(fieldToFill).prop('disabled', false);
});

$('#translations_0').keyup(function () {
    $('a.btn-translate').removeClass('disabled');

    if ($(this).val() === '') {
        $('a.btn-translate').addClass('disabled');
    }
});

$(document).ready(function () {
    $('#translations_0').trigger('keyup');

    const toggleField = $('.inline-field div[contenteditable].toggle-field');

    toggleField.focus(function () {
        const field = $(this).closest('.inline-field');
        field.addClass('focused');
    });

    toggleField.focusout(function () {
        const field = $(this).closest('.inline-field');
        field.removeClass('focused');
    });

    toggleField.on('keypress', function(e) {
        // Use the enter key to save the translation
        if(e.which === 13 && !e.shiftKey) {
            const field = $(this).closest('.inline-field').find('div[contenteditable]');

            updateTranslation(field);

            toggleField.blur();
        }
    });

    $('a.platform').click(function(e) {
        e.preventDefault();

        updatePlatform($(this).find('i.fa'));
    });

    $('.inline-field').find('.btn').click(function (e) {
        e.preventDefault();

        const field = $(this).closest('.inline-field').find('div[contenteditable]');

        const fieldToTranslate = $(this).closest('td').find('.inline-field:first-child div[contenteditable]');
        const fieldToFill = $(this).closest('.inline-field').find('div[contenteditable]');
        const from = fieldToTranslate.data('lang');
        const to = fieldToFill.data('lang');

        translate(from, to, fieldToTranslate.html(), function (response) {
            if (response.text && response.text.length > 0) {
                fieldToFill.html(response.text[0]);

                // Save the translation in our database
                updateTranslation(field);
            }
        });
    });
});

/**
 * Update the translation
 * @param field
 */
function updateTranslation(field) {
    $.ajax({
        url: '/admin/translations/inline',
        type: 'POST',
        dataType: 'json',
        data: {
            translation_key_id: field.data('translation-key-id'),
            language: field.data('lang'),
            text: field.html()
        },
        success: function (response) {
            if(response.error) {
                console.log(response.error);
            }
        }
    });
}

/**
 * Toggle the platform
 * @param icon
 */
function updatePlatform(icon) {
    const link = icon.parent();

    $.ajax({
        url: '/admin/translations/platform',
        type: 'POST',
        dataType: 'json',
        data: {
            translation_key_id: icon.closest('tr').data('translation-key-id'),
            platform: icon.hasClass('fa-android') ? 'android' : 'ios',
            active: !link.hasClass('active')
        },
        success: function (response) {
            if(!response.error) {
                if(link.hasClass('active')) {
                    link.removeClass('active');
                } else {
                    link.addClass('active');
                }
            }
        }
    });
}

/**
 * Translate the text for the default language to the requested language
 * @param from
 * @param to
 * @param text
 * @param callback
 */
function translate(from, to, text, callback) {
    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        key: 'trnsl.1.1.20190131T085112Z.66ef20c1cb0c5e71.8172f269bcb719c15c75f1a6d0560192b1174ee1',
        lang: from + '-' + to,
        text: text
    }, callback);
}


