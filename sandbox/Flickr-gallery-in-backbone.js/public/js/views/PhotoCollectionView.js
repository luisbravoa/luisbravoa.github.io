define(
    [
        'jquery',
        'underscore',
        'backbone',
        'handlebars',
        'collections/FlickrCollection',
        'views/PhotoModelView'

    ], function($, _, Backbone, Handlebars, FlickrCollection, PhotoModelView) {

    var PhotoCollectionView = Backbone.View.extend({
    collection: FlickrCollection,
    className: 'photos',
    initialize: function () {
        var self = this;
        var collection = self.collection;
        // show initial loader image
        $(function () {
            $(collection.container).html('<div class="loader"><img src="' + collection.loaderImage + '"></div>');
        });

        self.listenTo(self.collection, "photosReady", self.render);
        self.listenTo(self.collection, 'loading', self.startLoader);
        self.render();
    },
    events: {
        "click .pages .page": "changePage",
        "click #flickr-search-button": "search",
        "keypress #flickr-search": "searchWithEnterKey"
    },
    searchWithEnterKey: function(e){
        var self = this;
        if(e.keyCode == 13){
            self.search();
        }
    },
    search: function () {
        var self = this;
        var text = self.$el.find('#flickr-search').val();
        self.collection.fetch(text, 1);
    },
    changePage: function (e) {
        e.preventDefault();
        var self = this;
        var page = e.target.rel;
        self.collection.fetch(self.collection.search, page);
    },
    // TODO: template could go in a separate files
    template:
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<h1>{{title}}</h1>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<h2>{{#if search}}Results for {{search}}{{else}}Most recent photos{{/if}}</h2>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-4">' +
                '<div class="form-inline" role="form">' +
                    '<div class="form-group">' +
                        '<label class="sr-only" for="flickr-search">Email address</label>' +
                            '<input class="form-control" id="flickr-search" placeholder="search"  value="{{search}}">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<button type="button" class="btn btn-default" id="flickr-search-button">Search</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col-md-5">' +
                '<div class="pages"></div>' +
            '</div>' +
            '<div class="col-md-2">' +
                '<p class="pages-of-pages">Page {{page}} of {{pages}}</p>' +
            '</div>' +
        '</div>' +
        '<div class="flickr-photos"></div>',
    paginator: function () {
        var self = this;
        var collection = self.collection;
        var currentPage = collection.page;
        var totalPages = collection.pages;
        var html = '';

        if (currentPage > 1) {
            html += '<a class="page  btn btn-default" href="#" rel="' + (currentPage - 1) + '"><</a>';
        }

        for (var i = 1; i <= totalPages; i++) {
            if (i == currentPage) {
                if (currentPage == 1) {
                    html += '<span class="page btn btn-default disabled">' + currentPage + '</span>';
                } else if (currentPage == totalPages) {
                    html += '<span class="page  btn btn-default disabled">' + currentPage + '</span>';
                } else {
                    html += '<span class="page  btn btn-default disabled">' + currentPage + '</span> ';
                }
            } else {
                if (i >= currentPage - 4 && i < currentPage + 4) {
                    html += '<a href="#" class="page  btn btn-default"  rel="' + i + '">' + i + '</a>';
                }
            }
        }
        if (currentPage < totalPages) {
            html += '<a class="page  btn btn-default" href="#" rel="' + (currentPage + 1) + '">></a>';
        }
        return html;
    },
    render: function () {
        var self = this;
        var collection = self.collection;
        var template = Handlebars.compile(self.template);
        var templateData = {
            page: collection.page,
            pages: collection.pages,
            total: collection.total,
            search: collection.search,
            title: collection.headerTitle
        };
        $(collection.container).html(self.$el);
        self.stopLoader();

        self.$el.html(template(templateData));
        self.collection.forEach(function (model) {
            var photoView = new PhotoModelView({model: model});
            photoView.render();
            self.$el.find('.flickr-photos').append(photoView.el);
        }, this);
        self.$el.find('.pages').append(self.paginator());
        self.delegateEvents();
        return this;
    },
    startLoader: function () {
        var self = this;
        self.$el.find('.flickr-photos').html('<div class="loader"><img src="' + self.collection.loaderImage + '"></div>');
    },
    stopLoader: function () {
        var self = this;
        self.$el.find('.loader').remove();
    }
});

    return PhotoCollectionView;

});