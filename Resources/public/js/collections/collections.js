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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/js/collections/collections.js":
/*!********************************************************!*\
  !*** ./Resources/assets/js/collections/collections.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  function select2Format(icon) {
    var originalOption = icon.element;
    return $('<span><i class="fa ' + $(originalOption).data('class') + ' fa-lg"></i> ' + icon.text + '</span>');
  }

  $('.select2').select2({
    width: "100%",
    templateSelection: select2Format,
    templateResult: select2Format,
    allowHtml: true
  }); // Create the identifier

  $('input[id="collection_form_name"]').keyup(function () {
    if (!canCreateIdentifier) {
      return false;
    }

    var identifier = forms.createIdentifier($(this).val());
    $('input[id="collection_form_identifier"]').val(identifier);
  });
  var properties = $('tbody.sortable');
  /**
   * Allow sorting of the table rows
   */

  properties.sortable({
    forcePlaceholderSize: true,
    helper: function helper(event, ui) {
      ui.children().each(function () {
        $(this).width($(this).width());
      });
      return ui;
    },
    stop: function stop(event, ui) {
      updatePosition($(this));
    }
  });
  /**
   * Update the position of the card elements
   * @param sortable
   */

  function updatePosition(sortable) {
    $.ajax({
      data: sortable.sortable('serialize'),
      type: 'post',
      url: properties.data('url'),
      dataType: 'json',
      error: function error(jqXHR, textStatus, errorThrown) {
        console.log(textStatus + " - " + errorThrown);
      }
    });
  }

  $('.dropdown-content li a').click(function (e) {
    e.preventDefault();
    materialize.loader.show();
    $.ajax({
      data: {
        property_id: $(this).data('id')
      },
      type: 'post',
      url: $(this).attr('href'),
      dataType: 'json',
      success: function success(response) {
        window.location = response.redirectUrl;
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        materialize.loader.hide();
        console.log(textStatus + " - " + errorThrown);
      }
    });
  });
});

/***/ }),

/***/ 12:
/*!**************************************************************!*\
  !*** multi ./Resources/assets/js/collections/collections.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/thomasroovers/Developer/Homestead/Pronto/MobileBundle/Resources/assets/js/collections/collections.js */"./Resources/assets/js/collections/collections.js");


/***/ })

/******/ });