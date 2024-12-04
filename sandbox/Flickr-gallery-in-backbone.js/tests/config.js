require.config({
    baseUrl: '../public/js',
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
        },
        mocha: {
            exports: 'mocha'
        },
        sinon: {
            exports: 'sinon'
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

require(['require', 'collections/FlickrCollection', 'models/PhotoModel'], function (require, FlickrCollection, PhotoModel) {

    require([
        'js/collection.js'
    ], function (require) {
        mocha.run();
    });

});