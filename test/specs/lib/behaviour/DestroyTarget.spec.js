define(function (require) {
    var $ = require('jquery');
    var DestroyTarget = require('lib/behaviour/DestroyTarget');
    var Model = require('componentLibrary-Utils/ExtendedBackboneModel');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('DestroyTarget Component', function () {
        var underTest, model, renderer, explosionRenderer;

        var $body = $('body');
        beforeEach(function () {

            renderer = new HtmlRenderer();
            renderer.initialize();
            $body.append(renderer.$el);

            explosionRenderer = new HtmlRenderer();
            explosionRenderer.initialize();
            $body.append(explosionRenderer.$el);

            model = new Model({
                destroyed: false
            });

            underTest = new DestroyTarget();
            underTest.renderer = renderer;
            underTest.explosionRenderer = explosionRenderer;
            underTest.model = model;

            underTest.start();
        });

        afterEach(function(){
            renderer.destroy();
            explosionRenderer.destroy();
        });

        describe('when model change:destroyed', function () {
            it('should addClass destroyed to renderer', function () {
                underTest.model.setDestroyed(true);
                expect(underTest.renderer.$el.hasClass('destroyed')).to.equal(true);
            });
            it('should addClass animate to explosionRenderer', function () {
                underTest.model.setDestroyed(true);
                expect(underTest.explosionRenderer.$el.hasClass('animate')).to.equal(true);
            });
        });
    });
});
