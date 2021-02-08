define(function (require) {
    var $ = require('jquery');
    var ChipTarget = require('lib/behaviour/ChipTarget');
    var Model = require('lib/model/Target');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('ChipTarget Component', function () {
        var underTest, model, renderer, explosionRenderer;

        var $body = $('body');
        beforeEach(function () {

            renderer = new HtmlRenderer();
            renderer.initialize();
            $body.append(renderer.$el);

            explosionRenderer = new HtmlRenderer();
            explosionRenderer.initialize();
            $body.append(explosionRenderer.$el);

            model = new Model();

            underTest = new ChipTarget();
            underTest.renderer = renderer;
            underTest.explosionRenderer = explosionRenderer;
            underTest.model = model;

            underTest.start();
        });

        afterEach(function(){
            renderer.destroy();
            explosionRenderer.destroy();
        });

        describe('when model change:chippedTop', function () {
            describe('when model chippedBottom is false', function () {
                it('should addClass chippedTop to renderer', function () {
                    underTest.model.setChippedBottom(false);
                    underTest.model.setChippedTop(true);
                    expect(underTest.renderer.$el.hasClass('chippedTop')).to.equal(true);
                });
            });

            describe('when model chippedBottom is true', function () {
                it('should addClass chipped to renderer', function () {
                    underTest.model.setChippedBottom(true);
                    underTest.model.setChippedTop(true);
                    expect(underTest.renderer.$el.hasClass('chipped')).to.equal(true);
                });
            });

            describe('when model destroyed is true', function () {
                it('should NOT addClass chipped or chippedTop to renderer', function () {
                    underTest.model.setDestroyed(true);
                    expect(underTest.renderer.$el.hasClass('chipped') || underTest.renderer.$el.hasClass('chippedTop')).to.equal(false);
                });
            });
        });

        describe('when model change:chippedBottom', function () {
            describe('when model chippedTop is false', function () {
                it('should addClass chippedBottom to renderer', function () {
                    underTest.model.setChippedTop(false);
                    underTest.model.setChippedBottom(true);
                    expect(underTest.renderer.$el.hasClass('chippedBottom')).to.equal(true);
                });
            });

            describe('when model chippedTop is true', function () {
                it('should addClass chipped to renderer', function () {
                    underTest.model.setChippedTop(true);
                    underTest.model.setChippedBottom(true);
                    expect(underTest.renderer.$el.hasClass('chipped')).to.equal(true);
                });
            });

            describe('when model destroyed is true', function () {
                it('should NOT addClass chipped or chippedBottom to renderer', function () {
                    underTest.model.setDestroyed(true);
                    expect(underTest.renderer.$el.hasClass('chipped') || underTest.renderer.$el.hasClass('chippedBottom')).to.equal(false);
                });
            });
        });
    });
});
