require('../jscolor');

$(document).ready(function () {

    $('.select2').select2({
        width: '100%',
        allowHtml: true
    });

    $('div.circle').each(function () {
        $(this).colourBrightness();
    });

    // Adjust the color of the label to the background color
    $('.label').each(function() {
        $(this).colourBrightness();
    });
});