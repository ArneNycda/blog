define(['jquery'], $ => {
    $('#post-filter input').click(() => {
        $.get('/retrieveUserid', data => {
            $(`.post:not([user-id="${data.userid}"])`).toggle();
        });
    });
});
