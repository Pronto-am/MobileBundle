/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Resources/assets/bundles/color-brightness/colorbrightness.min.js":
/*!******************************************************************************!*\
  !*** ./src/Resources/assets/bundles/color-brightness/colorbrightness.min.js ***!
  \******************************************************************************/
/***/ (() => {

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

/***/ "./src/Resources/assets/js/colorbrightness.js":
/*!****************************************************!*\
  !*** ./src/Resources/assets/js/colorbrightness.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../bundles/color-brightness/colorbrightness.min */ "./src/Resources/assets/bundles/color-brightness/colorbrightness.min.js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************************!*\
  !*** ./src/Resources/assets/js/customers/customers.js ***!
  \********************************************************/
var colourBrightness = __webpack_require__(/*! ../colorbrightness */ "./src/Resources/assets/js/colorbrightness.js");

$(document).ready(function () {
  $('div.circle').each(function () {
    $(this).colourBrightness();
  });
});
})();

/******/ })()
;