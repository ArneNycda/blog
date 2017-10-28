define(['jquery'], function($){    
    $('#new-post #submit').click(function() {
        event.preventDefault();

        $.get('/retrieveUserid', function(data) {
            $.ajax({
                type: 'POST',
                url: `/api/user/${data.userid}/post`,
                data: {
                    title: $('#title').val(),
                    body: $('#body').val()
                },
                success: function(newPost) {
                    window.location.href = `/post/?post=${newPost.id}`;
                }
            });
        });
    });
});
