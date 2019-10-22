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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/bundles/color-brightness/colorbrightness.min.js":
/*!**************************************************************************!*\
  !*** ./Resources/assets/bundles/color-brightness/colorbrightness.min.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 *  colourBrightness.js
 *
 *  Copyright 2013-2016, Jamie Brittain - http://jamiebrittain.com
 *  Released under the WTFPL license
 *  http://sam.zoy.org/wtfpl/
 *
 *  Github:  http://github.com/jamiebrittain/colourBrightness.js
 *  Version: 1.2
 */
!function (r) {
  r.fn.colourBrightness = function () {
    function r(r) {
      for (var t = ""; "html" != r[0].tagName.toLowerCase() && (t = r.css("background-color"), "rgba(0, 0, 0, 0)" == t || "transparent" == t);) {
        r = r.parent();
      }

      return t;
    }

    var t,
        a,
        s,
        e,
        n = r(this);
    return n.match(/^rgb/) ? (n = n.match(/rgba?\(([^)]+)\)/)[1], n = n.split(/ *, */).map(Number), t = n[0], a = n[1], s = n[2]) : "#" == n[0] && 7 == n.length ? (t = parseInt(n.slice(1, 3), 16), a = parseInt(n.slice(3, 5), 16), s = parseInt(n.slice(5, 7), 16)) : "#" == n[0] && 4 == n.length && (t = parseInt(n[1] + n[1], 16), a = parseInt(n[2] + n[2], 16), s = parseInt(n[3] + n[3], 16)), e = (299 * t + 587 * a + 114 * s) / 1e3, 125 > e ? this.removeClass("light").addClass("dark") : this.removeClass("dark").addClass("light"), this;
  };
}(jQuery);

/***/ }),

/***/ "./Resources/assets/js/colorbrightness.js":
/*!************************************************!*\
  !*** ./Resources/assets/js/colorbrightness.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../bundles/color-brightness/colorbrightness.min */ "./Resources/assets/bundles/color-brightness/colorbrightness.min.js");

/***/ }),

/***/ "./Resources/assets/js/customers/customers.js":
/*!****************************************************!*\
  !*** ./Resources/assets/js/customers/customers.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var colourBrightness = __webpack_require__(/*! ../colorbrightness */ "./Resources/assets/js/colorbrightness.js");

$(document).ready(function () {
  $('div.circle').each(function () {
    $(this).colourBrightness();
  });
});

/***/ }),

/***/ 11:
/*!**********************************************************!*\
  !*** multi ./Resources/assets/js/customers/customers.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/thomasroovers/Developer/Homestead/Pronto/MobileBundle/Resources/assets/js/customers/customers.js */"./Resources/assets/js/customers/customers.js");


/***/ })

/******/ });