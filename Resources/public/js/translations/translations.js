/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/js/translations/translations.js":
/*!**********************************************************!*\
  !*** ./Resources/assets/js/translations/translations.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ 16:
/*!****************************************************************!*\
  !*** multi ./Resources/assets/js/translations/translations.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/thomasroovers/Developer/Homestead/Pronto/MobileBundle/Resources/assets/js/translations/translations.js */"./Resources/assets/js/translations/translations.js");


/***/ })

/******/ });