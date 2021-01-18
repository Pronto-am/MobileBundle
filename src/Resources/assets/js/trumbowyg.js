require('trumbowyg');

$.trumbowyg.svgPath = '/trumbowyg/icons.svg';

$('.trumbowyg').trumbowyg({
    autogrowOnEnter: true,
    imageWidthModalEdit: true
}).on('tbwchange', function () {

});

$(document).ready(function () {
    $('.trumbowyg-modal-box input').each(function () {
        $(this).addClass('browser-default');
    });
});
