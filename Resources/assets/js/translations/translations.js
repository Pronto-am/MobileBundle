$('a.btn-translate').click(function(e) {
    e.preventDefault();

    const defaultValue = $('#translations_0').val();
    const fieldToFill = $(this).closest('.row').find('input[id^="translations_"]');
    const from = $('#translations_0').data('lang');
    const to = fieldToFill.data('lang');

    $(this).addClass('disabled');
    $(fieldToFill).prop('disabled', true);

    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        key: 'trnsl.1.1.20190131T085112Z.66ef20c1cb0c5e71.8172f269bcb719c15c75f1a6d0560192b1174ee1',
        lang: from + '-' + to,
        text: defaultValue
    }, function(response) {
        if(response.text && response.text.length > 0) {
            fieldToFill.val(response.text[0]);
        }
    });

    $(this).removeClass('disabled');
    $(fieldToFill).prop('disabled', false);
});

$('#translations_0').keyup(function() {
    $('a.btn-translate').removeClass('disabled');

    if($(this).val() === '') {
        $('a.btn-translate').addClass('disabled');
    }
});

$(document).ready(function() {
    $('#translations_0').trigger('keyup');
});