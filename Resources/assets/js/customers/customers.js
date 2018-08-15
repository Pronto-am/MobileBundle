const colourBrightness = require('../colorbrightness');

$(document).ready(function () {

    $('div.circle').each(function () {
        $(this).colourBrightness();
    });
});