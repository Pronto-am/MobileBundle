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
     * Select 2
     */
    $('.select2-tags').select2({
        tags: true,
        width: '100%',
        allowHtml: true
    });

    $('.select2').select2({
        width: '100%',
        allowHtml: true
    });

    $('a.platform').click(function (e) {
        e.preventDefault();

        updatePlatform($(this).find('i.fa'));
    });

    $('#remote_config_form_type').change(function () {
        $('.config-type').hide();

        let value = $(this).val();

        if (value !== '') {
            $('.config-type.config-type-' + value).show();
        }
    });

    $('#remote_config_form_type').trigger('change');

    $('#remote_config_form_name').keyup(function () {
        $('.config-type.config-type-bool').find('label[for="remote_config_form_value_bool"]').text($(this).val().length === 0 ? valueTranslation : $(this).val());
    });
});

/**
 * Toggle the platform
 * @param icon
 */
function updatePlatform(icon) {
    const link = icon.parent();

    $.ajax({
        url: '/admin/config/platform',
        type: 'POST',
        dataType: 'json',
        data: {
            remote_config_id: icon.closest('tr').data('remote-config-id'),
            platform: icon.hasClass('fa-android') ? 'android' : 'ios',
            active: !link.hasClass('active')
        },
        success: function (response) {
            if (!response.error) {
                if (link.hasClass('active')) {
                    link.removeClass('active');
                } else {
                    link.addClass('active');
                }
            }
        }
    });
}
