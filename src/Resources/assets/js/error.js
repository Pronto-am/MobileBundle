const $ = require('jquery');

$(document).ready(function () {
    setTimeout(function () {
        $('#header img').addClass('hinge');

        setTimeout(function () {
            $('#header img').hide();
        }, 6000);
    }, 1000);
});
