const codeflask = require('../codeflask');

$(document).ready(function () {

    /**
     * CodeFlask initiation
     */
    codeflask.initProperties();

    $('.codeflask').each(function () {
        $(this).find('textarea').attr('name', $(this).data('name'));
    });


    /**
     * Form Submit handler
     */
    $('button[type="submit"]').click(function () {
        $('ul.validation-message').remove();

        if ($('#property_form_name').val() == '') {
            forms.markInvalid($('#property_form_name'));

            return false;
        }
    });


    let typeSelect = $('#property_form_type');

    typeSelect.change(function () {
        $('.type-config').hide();

        let value = $(this).val();
        let option = $(':selected', this);

        if (value !== '') {

            $('.type-config.type-' + option.data('identifier')).show();

            if (option.data('translatable') === 1) {
                $('.type-config.type-config-translatable').show();
            }
        }

        let includeInListView = $('#property_form_includeInListView').closest('.row');
        let includeInJsonListView = $('#property_form_includeInJsonListView').closest('.row');

        includeInListView.show();
        includeInJsonListView.show();

        if ($('option:selected', this).data('listview-compatible') === 0) {
            includeInListView.hide();
        }

        if ($('option:selected', this).data('json-listview-compatible') === 0) {
            includeInJsonListView.hide();
        }
    });

    typeSelect.trigger('change');


    /**
     * Identifier creation
     */
    $('input[id="property_form_name"]').keyup(function () {
        if (!canCreateIdentifier) {
            return false;
        }

        let identifier = forms.createIdentifier($(this).val());

        $('input[id="property_form_identifier"]').val(identifier);
    });


    /**
     * Generate a new select option form field
     */
    $('a[name="add-select-option"]').click(function () {
        let selectOption = $(this).closest('.col.s12').find('.select-option:first-child').clone();

        // Get the count of current options
        let count = $(this).closest('.col.s12').find('.select-option').length;

        // Update the field count
        let keyInput = selectOption.find('input[name$="key-1"]');
        let valueInput = selectOption.find('input[name$="value-1"]');

        keyInput.attr('name', keyInput.attr('name').replace('key-1', 'key-' + parseInt(count + 1)));
        valueInput.attr('name', valueInput.attr('name').replace('value-1', 'value-' + parseInt(count + 1)));

        // Insert info message
        if (count === 1) {
            $('<div class="alert alert-info">' + translations.leaveEmptyToIgnoreSelectOption + '</div>').insertBefore($(this));
        }

        // Add the option to the div
        selectOption.insertBefore($(this));
    });
});
