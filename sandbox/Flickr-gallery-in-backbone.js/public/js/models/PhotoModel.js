define(['jquery', 'underscore', 'backbone', 'bootstrap'], function($, _, Backbone) {

var PhotoModel = Backbone.Model.extend({
    src: function (sizeSuffix) {
        /*
            Returns the photo url depending on the sufix. See Flickr API documentation
            http://www.flickr.com/services/api/misc.urls.html
        */
        var self = this;
        if (!sizeSuffix) {
            sizeSuffix = 's';
        }
        return 'http://farm' + self.get('farm') + '.static.flickr.com/' + self.get('server') + '/' + self.get('id') + '_' + self.get('secret') + '_' + sizeSuffix + '.jpg';
    },
    url: function () {
        /* Returns the photo url on Flickr */
        var self = this;
        return 'http://www.flickr.com/photos/' + self.get('owner') + '/' + self.get('id');
    }
});

    return PhotoModel;

});
