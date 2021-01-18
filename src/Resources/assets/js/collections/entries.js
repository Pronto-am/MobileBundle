const codeflask = require('../codeflask');

const locationpicker = require('../locationpicker');

const sweetalert = require('../sweetalert');

$(document).ready(function () {

    /**
     * CodeFlask initiation
     */
    codeflask.initProperties();

    $('.codeflask').each(function () {
        $(this).find('textarea').attr('name', $(this).data('name'));
    });


    /**
     * Location picker initialization
     */
    $('.location-picker').each(function () {
        let latitudeField = $(this).closest('.row').find('.coordinates-latitude');
        let longitudeField = $(this).closest('.row').find('.coordinates-longitude');

        let latitude = latitudeField.val() !== '' ? latitudeField.val() : 51.5904382;
        let longitude = longitudeField.val() !== '' ? longitudeField.val() : 4.7595443;

        $(this).locationpicker({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            radius: 0,
            inputBinding: {
                latitudeInput: $(this).closest('.row').find('.coordinates-latitude'),
                longitudeInput: $(this).closest('.row').find('.coordinates-longitude'),
                locationNameInput: $(this).closest('.row').find('.coordinates-address'),
            },
            enableAutocomplete: true,
            addressFormat: 'street_address'
        });
    });


    $('a[name="delete-file"]').click(function (e) {
        e.preventDefault();

        let tr = $(this).parent().parent();

        let url = $(this).data('url');
        let filename = $(this).data('filename');
        let propertyIdentifier = $(this).data('property-identifier');

        sweetalert.confirm(translations.confirmTitle, translations.confirmText, function () {
            $('.loader-container').fadeIn(200);

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    filename: filename,
                    property: propertyIdentifier
                },
                success: function (data) {
                    if (!data.error) {
                        // Remove the file from the table
                        tr.remove();

                        let uploadedFiles = $('input[name="' + propertyIdentifier + '-uploaded"]');

                        // Remove the file from the existing files field
                        let uploaded = JSON.parse(uploadedFiles.val());

                        $.each(uploaded, function (key, file) {
                            if (file === filename) {
                                delete uploaded[key];

                                return false;
                            }
                        });

                        uploadedFiles.val(JSON.stringify(Object.values(uploaded)));
                    }

                    $('.loader-container').fadeOut(200);
                }
            });
        });
    });


    /**
     * Change the relation of the entry
     */
    $('a[name="set-relationship"]').click(function (e) {
        e.preventDefault();

        materialize.modals.createModal('large', $(this).data('href'), true);
    });


    $('button[type="submit"]').click(function () {
        forms.removeAlertsFromTabs();

        // Mark all fields as valid
        $('ul.validation-message').remove();
        $('input.invalid, textarea.invalid, select.invalid').removeClass('invalid');

        let valid = true;

        if (!validTextInput()) {
            valid = false;
        }

        if (!validNumberInput()) {
            valid = false;
        }

        if (!validCodeflaskTextarea()) {
            valid = false;
        }

        if (!validUrlInput()) {
            valid = false;
        }

        if (!validJson()) {
            valid = false;
        }

        if (!validSelectValues()) {
            valid = false;
        }

        if (!validCheckboxes()) {
            valid = false;
        }

        if (!validFilePath()) {
            valid = false;
        }

        return valid;
    });
});


/**
 * Validate text input
 *
 * @returns {boolean}
 */
function validTextInput() {
    let valid = true;

    $('input[type="text"]:not(.select-dropdown, .file-path), textarea').each(function () {
        if ($(this).prev('label').hasClass('required') && $(this).val() === '') {
            forms.markInvalid($(this));

            valid = false;
        }
    });

    return valid;
}


/**
 * Validate number input
 *
 * @returns {boolean}
 */
function validNumberInput() {
    let valid = true;

    $('input[type="number"]').each(function () {
        if ($(this).prev('label').hasClass('required') && $(this).val() === '') {
            forms.markInvalid($(this));

            valid = false;
        }

        if ($(this).val() !== '') {
            let min = $(this).attr('min');
            let max = $(this).attr('max');

            let value = parseFloat($(this).val());

            if (min !== 'undefined' && value < min) {
                forms.markInvalid($(this), translations.numberBelowMinimum);

                valid = false;
            }

            if (max !== 'undefined' && value > max) {
                forms.markInvalid($(this), translations.numberExceedsMaximum);

                valid = false;
            }
        }
    });

    return valid;
}


/**
 * Validate codeflask area's
 *
 * @returns {boolean}
 */
function validCodeflaskTextarea() {
    let valid = true;

    $('.codeflask textarea').each(function () {
        if ($(this).parent().prev('label').hasClass('required') && $(this).val() === '') {
            forms.markInvalid($(this).parent());

            valid = false;
        }
    });

    return valid;
}


/**
 * Validate json input
 *
 * @returns {boolean}
 */
function validJson() {
    let valid = true;

    $('.codeflask[data-language="json"] textarea').each(function () {
        try {
            let parsed = JSON.parse($(this).val());
        } catch (err) {
            forms.markInvalid($(this).parent(), translations.invalidJson);

            valid = false;
        }
    });

    return valid;
}


/**
 * Validate text input
 *
 * @returns {boolean}
 */
function validCheckboxes() {
    let valid = true;

    $('input[type="checkbox"]').each(function () {
        if ($(this).next('label').hasClass('required') && $(this).prop('checked') === false) {
            forms.markInvalid($(this));

            valid = false;
        }
    });

    return valid;
}


/**
 * Validate select input
 *
 * @returns {boolean}
 */
function validSelectValues() {
    let valid = true;

    $('select').each(function () {
        let parent = $(this).closest('.select-wrapper');

        let value = $('option:selected', this).attr('value');

        // .val() returns the option text when the option has no value attribute, so check the option:selected element
        // But, when selection is undefined, the value could still be an array for multi select, so check for that too
        if (parent.prev('label').hasClass('required')) {
            if ((typeof value === 'undefined' && !$.isArray($(this).val())) || (typeof value === 'undefined' && $.isArray($(this).val()) && $(this).val().length == 0)) {
                forms.markInvalid(parent);

                valid = false;
            }
        }
    });

    return valid;
}


/**
 * Validate text input
 *
 * @returns {boolean}
 */
function validUrlInput() {
    let valid = true;

    $('input[type="url"]').each(function () {
        // Add http before the url if it doesn't contain that
        if ($(this).val() !== '' && !/^https?:\/\//.test($(this).val())) {
            $(this).val('http://' + $(this).val());
        }

        if ($(this).prev('label').hasClass('required') && $(this).val() === '') {
            forms.markInvalid($(this));

            valid = false;
        } else if (!isUrlValid($(this).val()) && $(this).val() !== '') {
            forms.markInvalid($(this), translations.invalidFormat);

            valid = false;
        }
    });

    return valid;
}

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}


/**
 * Validate the file input
 *
 * @returns {boolean}
 */
function validFilePath() {
    let filePath = $('input.file-path');
    let identifier = filePath.data('identifier');

    if (filePath.val() === '' && $('input[name="' + identifier + '-uploaded"]').val() === '' && filePath.hasClass('required')) {
        forms.markInvalid(filePath.closest('.file-field'));

        return false;
    }

    return true;
}
