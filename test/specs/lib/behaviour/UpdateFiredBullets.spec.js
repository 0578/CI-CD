define(function(require) {
    var $ = require('jquery');
    var UpdateFiredBullets = require('lib/behaviour/UpdateFiredBullets');
    var Model = require('lib/model/Cannon');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('UpdateBulletsLeft Component', function() {
        var underTest, renderer, model;
        var $body = $('body');

        beforeEach(function() {
            renderer = new HtmlRenderer();
            renderer.parent = { $el: $body };
            renderer.initialize();
            renderer.start();

            model = new Model({
                enableFireButton: true,
                firedBullets: 0
            });

            underTest = new UpdateFiredBullets();
            underTest.renderer = renderer;
            underTest.model = model;
            underTest.start();
        });

        afterEach(function() {
            renderer.destroy();
        });

        describe('When Renderer is clicked', function() {
            it('should increment firedBullets', function() {
                renderer.$el.click();
                expect(model.getFiredBullets()).to.equal(1);
                renderer.$el.click();
                expect(model.getFiredBullets()).to.equal(2);
            });
        });

    });

});