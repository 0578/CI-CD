define(function(require) {
    var $ = require('jquery');
    var UpdateBulletsLeft = require('lib/behaviour/UpdateBulletsLeft');
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
                maximumBullets: 4,
                firedBullets: 1
            });

            underTest = new UpdateBulletsLeft();
            underTest.renderer = renderer;
            underTest.model = model;
            underTest.start();
        });

        afterEach(function() {
            renderer.destroy();
        });

        describe('When Model firedBullets is changed', function() {
            it('should update the renderer\'s class', function() {
                model.setFiredBullets(4);
                expect(renderer.$el.hasClass('showNone')).to.equal(true);
                model.setFiredBullets(3);
                expect(renderer.$el.hasClass('showOne')).to.equal(true);
                model.setFiredBullets(2);
                expect(renderer.$el.hasClass('showTwo')).to.equal(true);
                model.setFiredBullets(1);
                expect(renderer.$el.hasClass('showThree')).to.equal(true);
                model.setFiredBullets(0);
                expect(renderer.$el.hasClass('showThree')).to.equal(true);

            });
        });
    });
});