$('#new-user #submit').click(function() {
    event.preventDefault();

    $.ajax({
        type: "POST",
        url: `/api/user/create`,
        data: {
            username: $("#username").val(),
            password: $("#password").val(),
            displayname: $("#displayname").val()
        },
        success: function(newPost) {
            window.location.replace('/login');
        }
    });
});
