requirejs.config({
    baseUrl: 'public/js/page',
    paths: {
        jquery: [
            // '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
            '../lib/jquery'
        ],
        userValidation: '../lib/userValidation'
    }
});

define(['jquery'], function($) {
    require([
        'login',
        'register',
        'index',
        'newPost',
        'post'
    ]);
});
