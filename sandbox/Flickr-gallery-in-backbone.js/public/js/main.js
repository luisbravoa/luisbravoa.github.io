require(['routers/FlickrRouter'], function(FlickrRouter) {
        var flickrRouter = new FlickrRouter();
        Backbone.history.start();
});