/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/Resources/assets/js/login.js ***!
  \******************************************/
$(document).ready(function () {
  $('.activate-loader').click(function () {
    $('.loader-container').fadeIn(200);
  });
  $('.collection-customers .collection-item, .collection-applications .collection-item').click(function () {
    var id = $(this).data('id');
    var url = $(this).closest('.collection').hasClass('collection-customers') ? '/admin/customers' : '/admin/applications'; // Make the ajax call to select the customer

    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: {
        'id': id
      },
      success: function success(response) {
        if (!response.error) {
          window.location = response.data.url;
        }
      }
    });
  });
});
/******/ })()
;