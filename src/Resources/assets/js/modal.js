module.exports = {
    loader: module.exports = {
        show: function (modal) {
            let progress = $('<div class="progress"><div class="indeterminate"></div></div>');

            modal.find('.modal-content').append(progress);

            modal.find('button[type="submit"]').addClass('disabled');
        },
        hide: function (modal) {
            modal.find('.progress').remove();

            modal.find('button[type="submit"]').removeClass('disabled');
        }
    }
}
