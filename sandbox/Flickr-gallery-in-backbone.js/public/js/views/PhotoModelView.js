define(['jquery', 'underscore', 'backbone', 'handlebars', 'models/PhotoModel'], function($, _, Backbone, Handlebars, PhotoModel) {

    var PhotoModelView = Backbone.View.extend({
    model: PhotoModel,
    className: 'flickr-photo',
    template: '<a href="{{url}}"><img class="alpha" src="{{src}}"></a>',
    render: function () {
        var self = this;
        self.model.view = this;
        var template = Handlebars.compile(self.template);
        var data = self.model.toJSON();
        data.src = self.model.src();
        data.url = self.model.url();
        data.url = '#photo/' + data.id;
        this.$el.html(template(data));
        return this;
    }
});

    return PhotoModelView;

});