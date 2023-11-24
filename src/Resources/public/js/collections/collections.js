/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./src/Resources/assets/js/collections/collections.js ***!
  \************************************************************/
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
  });

  // Create the identifier
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
/******/ })()
;