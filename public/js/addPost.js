$('#new-post #submit').click(function() {
    event.preventDefault();

    const userid = '1';

    $.ajax({
        type: "POST",
        url: `/api/user/${userid}/post`,
        data: {
            title: $("#title").val(),
            body: $("#body").val()
        },
        success: function(newPost) {
            window.location.replace(`/post/?post=${newPost.id}`);
        }
    });
});
