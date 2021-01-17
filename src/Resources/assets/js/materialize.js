require('materialize-css');
require('./colorbrightness');

module.exports = {
    init: function () {
        $('select').material_select();

        $('.modal').modal();

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 1, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            format: 'dd-mm-yyyy',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true // Close upon selecting a date,
        });


        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function () {
            } //Function for after opening timepicker
        });


        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });


        /**
         * Make sure the listview tab
         */
        $('ul.tabs li a').each(function () {
            let hash = $(this).attr('href');

            $(hash + ' a.column-sortable').each(function () {
                let href = $(this).attr('href');

                if (href.indexOf(hash) === -1) {
                    $(this).attr('href', href + hash);
                }
            });

            $(hash + ' ul.pagination li a').each(function () {
                let href = $(this).attr('href');

                if (href.indexOf(hash) === -1) {
                    $(this).attr('href', href + hash);
                }
            });
        });

        $('input[data-length], textarea[data-length]').characterCounter();

        $('.is-clickable').click(function () {
            window.location.href = $(this).data('href');
        });


        module.exports.collapsible.initializeCollapsible();
    },
    loader: module.exports = {
        show: function () {
            $('.loader-container:not(.page-loader-container)').fadeIn(200);
        },
        hide: function () {
            $('.loader-container:not(.page-loader-container)').fadeOut(200);
        }
    },
    progress: module.exports = {
        show: function () {
            $('#page .progress').removeClass('hide');
        },
        hide: function () {
            $('#page .progress').addClass('hide');
        }
    },
    alerts: module.exports = {
        show: function (text, type = 'info') {
            let alert = $('<div class="alert alert-' + type + ' floating">' + text + '</div>');

            alert.css({'bottom': '-80px'});

            $('#page > .row > .col').append(alert);

            alert.animate({'bottom': '40px'}, 200);

            module.exports.alerts.hide();
        },
        hide: function () {
            setTimeout(function () {
                $('.alert.floating').animate({'bottom': '-80px'}, 200);

                setTimeout(function () {
                    $('.alert.floating').remove();
                }, 100);
            }, 6000);
        }
    },
    tabs: module.exports = {
        selectTab: function (id) {
            $('ul.tabs').tabs('select_tab', id);
        }
    },
    select: module.exports = {
        initializeSelect: function (selector) {
            $(typeof selector === 'undefined' ? 'select' : selector).material_select();
        }
    },
    tooltips: module.exports = {
        initialize: function () {
            $('.tooltipped').tooltip({delay: 50});
        }
    },
    modals: module.exports = {
        createModal: function (size, view, form = false) {
            let modal = $('#modal-' + size);

            module.exports.loader.show();

            $(modal).load(view, function () {
                module.exports.loader.hide();

                $('.modal-header', modal).colourBrightness();

                if (form) {
                    modal.addClass('modal-fixed-footer');
                } else {
                    modal.removeClass('modal-fixed-footer');
                }

                $('select').material_select();

                modal.modal();
                modal.modal('open');
            });
        }
    },
    collapsible: module.exports = {
        initializeCollapsible: function () {
            $('.collapsible').collapsible();

            $('.collapsible .collapsible-header a').on('click', function (e) {
                e.stopPropagation();
            });
        }
    }
};