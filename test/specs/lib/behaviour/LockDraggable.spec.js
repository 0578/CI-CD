define(function (require) {
    var $ = require('jquery');
    var LockDraggable = require('lib/behaviour/LockDraggable');
    var Model = require('lib/model/Cannon');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');
    var sinon = require('sinon');
    require('componentLibraryJQueryUI/Draggable');

    describe('LockDraggable Component', function () {
        var underTest, model, renderer;
        var sandbox = sinon.sandbox.create();
        var $body = $('body');

        beforeEach(function () {
            renderer = new HtmlRenderer();
            renderer.initialize();
            $body.append(renderer.$el);

            model = new Model({
                lockSim: false
            });

            underTest = new LockDraggable();
            underTest.renderer = renderer;
            underTest.model = model;
            underTest.start();

            sandbox.stub(underTest.renderer.$el, 'draggable');
        });

        afterEach(function(){
            renderer.destroy();
        });

        describe('when model change:lockSim', function () {
            it('should disable the aim draggable', function () {
                model.setLockSim(true);
                expect(renderer.$el.draggable.callCount).to.equal(1);
            });
        });
    });
});
