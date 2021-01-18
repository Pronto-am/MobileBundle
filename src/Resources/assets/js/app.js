const $ = require('jquery');
window.$ = global.jQuery = $;

const dates = require('./dates');
window.dates = dates;

const forms = require('./forms');
window.forms = forms;

const materialize = require('./materialize');
window.materialize = materialize;

const sweetalert = require('./sweetalert');

require('./colorbrightness');

$(window).on('load', function () {
    setTimeout(function () {
        $('.page-loader-container').fadeOut(200);
    }, 500);
});

$(document).ready(function () {

    materialize.init();

    forms.init();

    // Adjust the color of the label to the background color
    $('.label').each(function () {
        $(this).colourBrightness();
    });


    $('.activate-loader').click(function () {
        materialize.loader.show();
    });


    /**
     * Submenu dropdown toggler
     */
    $('.submenu-dropdown-toggle').click(function (event) {
        let icon = $(this).find('i');
        let submenu = $(this).closest('a').next('ul');

        if (icon.hasClass('fa-caret-down')) {
            icon.removeClass('fa-caret-down');
            icon.addClass('fa-caret-up');
        } else {
            icon.removeClass('fa-caret-up');
            icon.addClass('fa-caret-down');
        }

        submenu.slideToggle(300);

        return false;
    });


    /**
     * Trigger the dropdown toggle when a collection is highlighted
     */
    $('li.has-sub-menu').each(function () {
        if ($(this).hasClass('submenu-open')) {
            $(this).find('.submenu-dropdown-toggle').trigger('click');
        }
    });


    /**
     * Single deletion of objects
     */
    $('a[name="single-delete"]').click(function () {
        let id = $(this).data('id');
        let url = $(this).data('url');

        sweetalert.confirm(translations.confirmTitle, translations.confirmText, function () {
            $('.loader-container').fadeIn(200);

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    'id': id
                },
                success: function (response) {
                    if (!response.error) {
                        if (response.data.redirectUrl) {
                            window.location = response.data.redirectUrl;
                        } else {
                            window.location.reload();
                        }
                    }
                }
            });
        });
    });


    /**
     * Table select all checkboxes
     */
    $('input[id^="checkAll"]').change(function () {
        let checkboxes = $(this).closest('table').find(':checkbox');
        checkboxes.prop('checked', $(this).is(':checked'));
    });

    $.each($('form :checkbox'), function (key, value) {
        let label = $('label[for="' + this.id + '"]');

        $(this).insertBefore(label);
    });


    /**
     * The handle function to delete multiple table records at once
     */
    $('.multiple-delete').click(function () {
        let parent = $(this).closest('.toolbar');

        let form;

        // Check if the form is inside a card
        if (parent.parents('.card-content').length > 0) {
            form = parent.next('form');
        } else {
            form = parent.next('.card').find('form');
        }

        // Find just a form when it's still not set
        if (form.length === 0) {
            form = parent.nextAll('form');
        }

        let checked = form.find('input:checkbox:checked').length;

        if (checked === 0) {
            materialize.alerts.show('U heeft geen items geselecteerd');
        } else {
            sweetalert.confirm(translations.confirmTitle, translations.confirmText, function () {
                form.submit();
            });
        }

        return false;
    });

    // Hide the floating alert on window load
    materialize.alerts.hide();
});
