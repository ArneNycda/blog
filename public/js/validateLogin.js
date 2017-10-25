$('#login').on('keyup', '.text-field', function() {
    const inputUsername = $('#username').val();
    const inputPassword = $('#password').val();
    const requiredLength = 8;
    const requiredFieldsFilled = hasValue('username') && hasValue('password');
    const requiredLengthsFilled = checkStringLength(inputUsername, requiredLength) && checkStringLength(inputPassword, requiredLength);

    if(requiredFieldsFilled && requiredLengthsFilled) {
        $('#login #submit').prop('disabled', false);
    } else {
        $('#login #submit').prop('disabled', true);
    }
});
