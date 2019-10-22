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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/js/collections/relationships.js":
/*!**********************************************************!*\
  !*** ./Resources/assets/js/collections/relationships.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var modal = __webpack_require__(/*! ../modal */ "./Resources/assets/js/modal.js");

$(document).ready(function () {
  // Create the identifier
  $('input[id="relationship_form_name"]').keyup(function () {
    if (!canCreateIdentifier) {
      return false;
    }

    var identifier = forms.createIdentifier($(this).val());
    $('input[id="relationship_form_identifier"]').val(identifier);
  });
  /**
   * Table select all checkboxes
   */

  $('input[id="checkAllRelationships"]').change(function () {
    var checkboxes = $(this).closest('table').find(':checkbox');
    checkboxes.prop('checked', $(this).is(':checked'));
  });
  /**
   * Filter relationship entries based on the provided search text
   */

  $('.modal input[name="search"]').keyup(function () {
    var value = $(this).val().toLowerCase();
    var rows = $('.modal .table tbody tr'); // Hide all rows

    rows.hide(); // Get the matching rows

    var toShow = rows.filter(function () {
      return $(this).find('td').filter(function () {
        return $(this).text().toLowerCase().indexOf(value) !== -1;
      }).length > 0;
    }); // Show the matching rows

    toShow.show();
  });
  /**
   * Disable or enable checkboxes when it's a one - one relationship
   */

  $('.modal .table tbody tr td input:checkbox').change(function () {
    if (!manyEntries) {
      var tbody = $(this).closest('tbody');

      if ($(this).prop('checked')) {
        // Disable the rest
        $('input:checkbox:not(:checked)', tbody).prop('disabled', true);
      } else {
        $('input:checkbox', tbody).prop('disabled', false);
      }
    }
  });

  if (!manyEntries) {
    $('.modal .table tbody tr td input:checkbox:checked').trigger('change');
  }
  /**
   * Catch the form submit handler
   */


  $('.modal form button[type="submit"]').click(function () {
    modal.loader.show($(this).closest('.modal'));
  });
});

/***/ }),

/***/ "./Resources/assets/js/modal.js":
/*!**************************************!*\
  !*** ./Resources/assets/js/modal.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  loader: module.exports = {
    show: function show(modal) {
      var progress = $('<div class="progress"><div class="indeterminate"></div></div>');
      modal.find('.modal-content').append(progress);
      modal.find('button[type="submit"]').addClass('disabled');
    },
    hide: function hide(modal) {
      modal.find('.progress').remove();
      modal.find('button[type="submit"]').removeClass('disabled');
    }
  }
};

/***/ }),

/***/ 15:
/*!****************************************************************!*\
  !*** multi ./Resources/assets/js/collections/relationships.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/thomasroovers/Developer/Homestead/Pronto/MobileBundle/Resources/assets/js/collections/relationships.js */"./Resources/assets/js/collections/relationships.js");


/***/ })

/******/ });