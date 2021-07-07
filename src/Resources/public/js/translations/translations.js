/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************************************!*\
  !*** ./src/Resources/assets/js/translations/translations.js ***!
  \**************************************************************/
$('a.btn-translate').click(function (e) {
  e.preventDefault();
  var defaultValue = $('#translations_0').val();
  var fieldToFill = $(this).closest('.row').find('textarea[id^="translations_"]');
  var from = $('#translations_0').data('lang');
  var to = fieldToFill.data('lang');
  $(this).addClass('disabled');
  $(fieldToFill).prop('disabled', true);
  translate(from, to, defaultValue, function (response) {
    if (response.text && response.text.length > 0) {
      fieldToFill.val(response.text[0]);
    }
  });
  $(this).removeClass('disabled');
  $(fieldToFill).prop('disabled', false);
});
$('#translations_0').keyup(function () {
  $('a.btn-translate').removeClass('disabled');

  if ($(this).val() === '') {
    $('a.btn-translate').addClass('disabled');
  }
});
$(document).ready(function () {
  document.execCommand("defaultParagraphSeparator", false, 'br');
  $('#translations_0').trigger('keyup');
  var toggleField = $('.inline-field textarea.toggle-field');
  toggleField.focus(function () {
    var field = $(this).closest('.inline-field');
    field.addClass('focused');
  });
  toggleField.focusout(function () {
    var field = $(this).closest('.inline-field');
    field.removeClass('focused');
  });
  toggleField.on('blur', function (e) {
    var field = $(this).closest('.inline-field').find('textarea');
    updateTranslation(field);
  });
  $('a.platform').click(function (e) {
    e.preventDefault();
    updatePlatform($(this).find('i.fa'));
  });
  $('.inline-field').find('.btn').click(function (e) {
    e.preventDefault();
    var field = $(this).closest('.inline-field').find('textarea');
    var fieldToTranslate = $(this).closest('td').find('.inline-field:first-child textarea');
    var fieldToFill = $(this).closest('.inline-field').find('textarea');
    var from = fieldToTranslate.data('lang');
    var to = fieldToFill.data('lang');
    translate(from, to, fieldToTranslate.val(), function (response) {
      if (response.text && response.text.length > 0) {
        fieldToFill.val(response.text[0]); // Save the translation in our database

        updateTranslation(field);
      }
    });
  });
});
/**
 * Update the translation
 * @param field
 */

function updateTranslation(field) {
  $.ajax({
    url: '/admin/translations/inline',
    type: 'POST',
    dataType: 'json',
    data: {
      translation_key_id: field.data('translation-key-id'),
      language: field.data('lang'),
      text: field.val()
    },
    success: function success(response) {
      if (response.error) {
        console.log(response.error);
      }
    }
  });
}
/**
 * Toggle the platform
 * @param icon
 */


function updatePlatform(icon) {
  var link = icon.parent();
  $.ajax({
    url: '/admin/translations/platform',
    type: 'POST',
    dataType: 'json',
    data: {
      translation_key_id: icon.closest('tr').data('translation-key-id'),
      platform: icon.hasClass('fa-android') ? 'android' : 'ios',
      active: !link.hasClass('active')
    },
    success: function success(response) {
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
/**
 * Translate the text for the default language to the requested language
 * @param from
 * @param to
 * @param text
 * @param callback
 */


function translate(from, to, text, callback) {
  $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate', {
    key: 'trnsl.1.1.20190131T085112Z.66ef20c1cb0c5e71.8172f269bcb719c15c75f1a6d0560192b1174ee1',
    lang: from + '-' + to,
    text: text
  }, callback);
}
/******/ })()
;