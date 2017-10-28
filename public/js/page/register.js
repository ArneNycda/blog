define(['jquery', 'userValidation'], function($, uV) {
    $('#new-user #submit').click(function() {
        event.preventDefault();

        const formData = {
            username: $("#username").val(),
            password: $("#first-password").val(),
            displayname: $("#displayname").val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/user/create',
            data: formData,
            success: function(newPost) {
                window.location.replace('/login');
            },
            error: function(data) {
                $('#new-user .registerCheck').show().html('The entered data is not correct.');
            }
        });
    });

    $('#new-user').on('keyup', '.text-field', function() {

        const requiredLength = 8;
        const input = $(this).val();
        const lengthErr = $(this).closest('div').find('.lengthCheck');
        const passwordErr = $(this).closest('#new-user').find('.passwordCheck');
        const field = $(this).attr('id').replace('/', '');
        const validateLength = uV.checkStringLength(input, requiredLength);
        const validatePassword =
            field === 'first-password' || field === 'second-password' ?
            uV.checkPassword($('#first-password').val(),$('#second-password').val())
            : true;
        const requiredFieldsFilled = uV.hasValue('username') && uV.hasValue('firstPassword') && uV.hasValue('secondPassword') && uV.hasValue('displayname');

        if (validateLength) {
            lengthErr.hide();
        } else {
            lengthErr.show().html(`The ${field} should be at least ${requiredLength} characters long.`);
        }

        if (validatePassword) {
            passwordErr.hide();
        } else {
            passwordErr.show().html(`The passwords do not match.`);
        }

        if($('.err:visible').length > 0 || !requiredFieldsFilled) {
            $('#new-user #submit').prop('disabled', true);
        } else {
            $('#new-user #submit').prop('disabled', false);
        }
    });
});
