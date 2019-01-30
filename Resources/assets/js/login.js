$(document).ready(function () {
    $('.activate-loader').click(function () {
        $('.loader-container').fadeIn(200);
    });

    $('.collection-customers .collection-item, .collection-applications .collection-item').click(function () {
        let id = $(this).data('id');

        let url = $(this).closest('.collection').hasClass('collection-customers') ? '/admin/customers' : '/admin/applications';

        // Make the ajax call to select the customer
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: {
                'id': id
            },
            success: function (data) {
                console.log(data)

                if(!data.error) {
                    window.location = data.url;
                }
            }
        });
    });
});