const modal = require('../modal');

$(document).ready(function () {
    // Create the identifier
    $('input[id="relationship_form_name"]').keyup(function () {
        if (!canCreateIdentifier) {
            return false;
        }

        let identifier = forms.createIdentifier($(this).val());

        $('input[id="relationship_form_identifier"]').val(identifier);
    });


    /**
     * Table select all checkboxes
     */
    $('input[id="checkAllRelationships"]').change(function () {
        let checkboxes = $(this).closest('table').find(':checkbox');
        checkboxes.prop('checked', $(this).is(':checked'));
    });


    /**
     * Filter relationship entries based on the provided search text
     */
    $('.modal input[name="search"]').keyup(function () {
        let value = $(this).val().toLowerCase();

        let rows = $('.modal .table tbody tr');

        // Hide all rows
        rows.hide();

        // Get the matching rows
        let toShow = rows.filter(function () {
            return $(this).find('td').filter(function () {
                return $(this).text().toLowerCase().indexOf(value) !== -1;
            }).length > 0;
        });

        // Show the matching rows
        toShow.show();
    });


    /**
     * Disable or enable checkboxes when it's a one - one relationship
     */
    $('.modal .table tbody tr td input:checkbox').change(function () {
        if (!manyEntries) {

            let tbody = $(this).closest('tbody');

            if ($(this).prop('checked')) {
                // Disable the rest
                $('input:checkbox:not(:checked)', tbody).prop('disabled', true);
            } else {
                $('input:checkbox', tbody).prop('disabled', false);
            }
        }
    });

    if (!manyEntries) {
        $('.modal .table tbody tr td input:checkbox:checked').trigger('change');
    }


    /**
     * Catch the form submit handler
     */
    $('.modal form button[type="submit"]').click(function () {
        modal.loader.show($(this).closest('.modal'));
    });
});
