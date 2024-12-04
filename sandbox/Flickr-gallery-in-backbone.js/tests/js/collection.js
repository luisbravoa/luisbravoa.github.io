define(function (require) {

    var FlickrCollection = require('collections/FlickrCollection');
    var PhotoModel = require('models/PhotoModel');

    describe('Collection', function () {
        describe('Get collection instance', function () {
            it('should return the collection instance', function () {
                var flickrCollection = new FlickrCollection(null);
                chai.expect(flickrCollection).to.be.ok;
            });
        });
        describe('test options', function () {
            it('should have the option properties ', function () {
                var options = {api_key: 'key', container: "#flickr-container", perPage: 75};
                var flickrCollection = new FlickrCollection(null, options);
                $.each(options, function (key, value) {
                    chai.expect(flickrCollection).to.have.property(key);
                    chai.expect(flickrCollection[key]).to.be.eq(value);
                });

            });
        });
        describe('test collection with data', function () {

            var fakeResponse = {"photos": {"page": 1, "pages": 7, "perpage": 150, "total": 1000, "photo": [
                {"id": "13310606065", "owner": "110445767@N03", "secret": "716a6dcebe", "server": "7302", "farm": 8, "title": "DSC02161.JPG", "ispublic": 1, "isfriend": 0, "isfamily": 0},
                {"id": "13310606295", "owner": "35871864@N08", "secret": "6cb7d32a69", "server": "7163", "farm": 8, "title": "", "ispublic": 1, "isfriend": 0, "isfamily": 0},
                {"id": "13310606555", "owner": "120980152@N04", "secret": "511ca2d6da", "server": "7097", "farm": 8, "title": "", "ispublic": 1, "isfriend": 0, "isfamily": 0},
                {"id": "13310606725", "owner": "57693526@N02", "secret": "6d24d32cd5", "server": "3749", "farm": 4, "title": "Pizza", "ispublic": 1, "isfriend": 0, "isfamily": 0},
                {"id": "13310989574", "owner": "72360649@N03", "secret": "f8c1fb4208", "server": "3677", "farm": 4, "title": "Che palombaro!", "ispublic": 1, "isfriend": 0, "isfamily": 0}
            ]}, "stat": "ok"};


            var flickrCollection = new FlickrCollection(null, null);

            it('should get fake data and set page, pages, total and search values to the collection', function () {

                var stub = sinon.stub(jQuery, "ajax").yieldsTo("success", fakeResponse);

                flickrCollection.getRequestData('', 1, function (data) {
                    chai.expect(flickrCollection.page).to.be.eq(1);
                    chai.expect(flickrCollection.pages).to.be.eq(7);
                    chai.expect(flickrCollection.total).to.be.eq(1000);
                    chai.expect(flickrCollection.search).to.be.eq('');

                });

                stub.restore();
            });

            it('should have a length of 5', function () {
                chai.expect(flickrCollection.length).to.be.eq(5);
            });
            it('set current photo to 0 should return first model', function () {
                var current = flickrCollection.setCurrent(0);
                chai.expect(current).is.not.equal(null);
                chai.expect(current.toJSON()).to.be.an('object');
            });

            it('set current photo to -1 should return null', function () {
                var current = flickrCollection.setCurrent(-1);
                chai.expect(current).is.equal(null);
            });
            it('set current photo to 20 should return null', function () {
                var current = flickrCollection.setCurrent(-1);
                chai.expect(current).is.equal(null);
            });
            it('no previous should return null', function () {
                flickrCollection.setCurrent(0);
                chai.expect(flickrCollection.prev()).is.equal(null);
            });
            it('previous should return model', function () {
                flickrCollection.setCurrent(3);
                chai.expect(flickrCollection.prev().toJSON()).to.be.an('object');

            });
            it('no next should return null', function () {
                flickrCollection.setCurrent(4);
                chai.expect(flickrCollection.next()).is.equal(null);
            });
            it('next should return model', function () {
                flickrCollection.setCurrent(3);
                chai.expect(flickrCollection.prev().toJSON()).to.be.an('object');

            });

        });

    });


});

