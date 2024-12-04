define(
    [
        'jquery',
        'underscore',
        'backbone',
        'handlebars',
        'collections/FlickrCollection',
        'views/PhotoModelView',
        'views/PhotoCollectionView',
        'bootstrap'
    ], function($, _, Backbone, Handlebars, FlickrCollection, PhotoModelView, PhotoCollectionView) {

var FlickrRouter = Backbone.Router.extend({
    routes: {
        "main": "main",
        "photo/:id": "photoDetail"
    },
    initialize: function () {
        var self = this;

        self.flickrCollection = new FlickrCollection(null, {api_key: '8e8b0a8d39a7af07485e7b992084a350', container: "#flickr-container"});
        // create view
        self.flickrView = new PhotoCollectionView({collection: self.flickrCollection});
        // get photos
        self.flickrCollection.fetch(null, 1);
    },
    main: function () {
        var self = this;
        document.title = 'Demo';
    },
    openModal: function () {
        var self = this;
        if ($('.photoModal').hasClass('in')) return;

        $('.photoModal').modal();
        $('.photoModal').on('hide.bs.modal', function (e) {

            // unbind keydown
            $(document).unbind('keydown');
            self.navigate('main', {trigger: true});
        });
    },
    closeModal: function () {
        var self = this;
        $('.photoModal').modal('hide');
    },
    photoDetail: function (id) {
        var self = this;
        var current = self.flickrCollection.get(id);

        // if current model is not defined close modal
        // TODO: think about what to do here, either show an error or load the photo
        if (!current) {
            self.closeModal();
            return;
        }
        // set window title
        document.title = current.get('title');
        self.flickrCollection.current = self.flickrCollection.indexOf(current);
        var next = self.flickrCollection.next();
        var prev = self.flickrCollection.prev();
        var templateData = {
            current: current.toJSON(),
            prev: (prev !== null) ? prev.toJSON() : null,
            next: (next !== null) ? next.toJSON() : null
        };
        // TODO: the image size could change depending on user's device (user agent)
        templateData.current.src = current.src('z');
        templateData.current.url = current.url();

        // TODO: template could go in separate files
        var template = '' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{current.title}}</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="prev">' +
            '{{#if prev}}' +
            '<a href="#photo/{{prev.id}}" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
            '{{/if}}' +
            '</div>' +
            '<div class="detailedPhoto">' +
            '<a href="{{current.url}}" target="_blank"><img src="{{current.src}}"></a>' +
            '</div>' +
            '<div class="next">' +
            '{{#if next}}' +
            '<a href="#photo/{{next.id}}" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
            '{{/if}}' +
            '</div>' +
            '</div>';
        var compiledTemplate = Handlebars.compile(template);
        var html = compiledTemplate(templateData);

        // Listen for arrow keys to go forward of backwards
        $(document).bind('keydown', function (e) {
            var key = e.keyCode;
            if (key == 39 && next !== null) {
                console.log('photo/' + next.get('id'));
                $(document).unbind('keydown');
                self.navigate('photo/' + next.get('id'), {trigger: true});
            }
            if (key == 37 && prev !== null) {
                $(document).unbind('keydown');
                self.navigate('photo/' + prev.get('id'), {trigger: true});
            }
        });

        $('.modal-content').html(html);
        self.openModal();
    }
});
       return FlickrRouter;

    });