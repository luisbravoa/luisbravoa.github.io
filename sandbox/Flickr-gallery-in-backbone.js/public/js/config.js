require.config({
    baseUrl: 'js',
    shim: {
        'underscore': {
            deps: ['jquery'],
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "bootstrap": ["jquery"],
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: 'lib/jquery-2.1.0',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars-v1.3.0',
        bootstrap: 'lib/bootstrap.min'
    }
});

require(['main']);