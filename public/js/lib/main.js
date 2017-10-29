requirejs.config({
    baseUrl: 'public/js',
    paths: {
        jquery: [
            // '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
            'lib/jquery'
        ],
        cookie: 'lib/jsCookie',
        login: 'page/login',
        register: 'page/register',
        index: 'page/index',
        newPost: 'page/newPost',
        post: 'page/post',
        setCookie: 'partial/setCookie',
        userValidation: 'partial/userValidation'
    }
});

define(['jquery'], function($) {
    require([
        'setCookie',
        'login',
        'register',
        'index',
        'newPost',
        'post'
    ]);
});
