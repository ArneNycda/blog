define(['jquery'], $ => {    
    $('#new-post #submit').click(() => {
        event.preventDefault();

        $.get('/retrieveUserid', data => {
            $.ajax({
                type: 'POST',
                url: `/api/user/${data.userid}/post`,
                data: {
                    title: $('#title').val(),
                    body: $('#body').val()
                },
                success(newPost) {
                    window.location.href = `/post/?post=${newPost.id}`;
                }
            });
        });
    });
});
