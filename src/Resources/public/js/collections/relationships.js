/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Resources/assets/js/modal.js":
/*!******************************************!*\
  !*** ./src/Resources/assets/js/modal.js ***!
  \******************************************/
/***/ ((module) => {

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
/*!**************************************************************!*\
  !*** ./src/Resources/assets/js/collections/relationships.js ***!
  \**************************************************************/
var modal = __webpack_require__(/*! ../modal */ "./src/Resources/assets/js/modal.js");

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
})();

/******/ })()
;