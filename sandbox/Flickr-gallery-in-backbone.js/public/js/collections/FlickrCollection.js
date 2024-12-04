define(['jquery', 'underscore', 'backbone', 'models/PhotoModel'], function($, _, Backbone, PhotoModel) {

var FlickrCollection = Backbone.Collection.extend({
    model: PhotoModel,
    initialize: function (models, options) {
        /* Takes optinal parameters such as api_key, container, loaderImage,
         perPage, headerTitle, etc */
        var self = this;
        // set options api_key, container, loaderImage, perPage, headerTitle, etc
        _.map(options, function (value, key) {
            self[key] = value;
        });

    },
    current: 0,
    container: "#flickr-container",
    perPage: 150,
    api_key: '8e8b0a8d39a7af07485e7b992084a350',
    base_url: "http://api.flickr.com/services/rest/",
    loaderImage: "images/loader.gif",
    headerTitle: 'Photos',
    getRequestData: function (search, page, successCallback, errorCallback) {
        // This method makes the flickr API request
        // when the search parameter is null this method will call the getRecent API method otherwise the search method is called
        var self = this;
        var data = {
            api_key: self.api_key,
            per_page: self.perPage,
            format: 'json',
            nojsoncallback: 1,
            page: (page !== null && page > 0) ? page : 1,
            method: (search !== null && search.length > 0) ? 'flickr.photos.search' : 'flickr.photos.getRecent'
        };
        if ((search !== null && search.length > 0)) {
            data.text = search;
        }
        $.ajax({
            url: self.base_url,
            data: data,
            success: function (res) {
                self.page = res.photos.page;
                self.pages = res.photos.pages;
                self.total = res.photos.total;
                self.search = search;
                self.reset();
                self.add(res.photos.photo);
                if (successCallback) successCallback(res);
            },
            error: function (jqXHR, textStatus) {
                if (errorCallback) errorCallback(jqXHR, textStatus);
            }
        });
    },
    fetch: function (search, page) {
        /* Triggers the “loading event and the “photosReady” event when done */
        var self = this;
        self.trigger('loading');
        function success() {
            self.trigger('photosReady');
        }

        self.getRequestData(search, page, success);
    },
    setCurrent: function (index) {
        var self = this;
        if (index > -1 && index < self.size())
            self.current = index;
        else {
            return null;
        }
        return self.at(index);
    },
    prev: function () {
        // returns the prev model if any
        // returns null if there's no previous model
        var self = this;
        var current = (self.current >= 0)? self.current : 0;
        var index = current - 1;
        if (index < 0) return null;
        return self.at(index);
    },
    next: function () {
        // returns the next model if any
        // returns null if there's no next model
        var self = this;
        var current = (self.current >= 0)? self.current : 0;
        var index = current + 1;
        if (index > self.size()-1) return null;
        return self.at(index);
    }

});

    return FlickrCollection;
});