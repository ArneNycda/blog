define(['jquery'], function($) {
    const Methods = {
        hasValue: id => $(`#${id}`).val() !== '',
        checkStringLength: (input, len) => input.length === 0 || input.length >= len,
        checkPassword: (firstPassword, secondPassword) => firstPassword === secondPassword
    };

    return Methods;
});
