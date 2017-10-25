$('#post-filter input').click(function() {
    $.get('/retrieveUserid', function(data) {
        $(`.post:not([user-id="${data.userid}"])`).toggle();
    });
});
