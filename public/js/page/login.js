define(['jquery', 'userValidation'], ($, uV) =>{
    $('#login-form').on('click', '#submit', () => {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/login',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: () => {
                window.location.replace('/');
            },
            error: () => {
                $('#login-form .err').show().html('The username or password is incorrect.');
            }
        });
    });

    $('#login').on('keyup', '.text-field', () => {
        const inputUsername = $('#username').val();
        const inputPassword = $('#password').val();
        const requiredLength = 8;
        const requiredFieldsFilled = uV.hasValue('username') && uV.hasValue('password');
        const requiredLengthsFilled = uV.checkStringLength(inputUsername, requiredLength) && uV.checkStringLength(inputPassword, requiredLength);

        if (requiredFieldsFilled && requiredLengthsFilled) {
            $('#login #submit').prop('disabled', false);
        } else {
            $('#login #submit').prop('disabled', true);
        }
    });
});
