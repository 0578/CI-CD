define(function(require) {
    var $ = require('jquery');
    var sinon = require('sinon');
    var CreateCannonBall = require('lib/behaviour/CreateCannonBall');
    var Model = require('lib/model/Cannon');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('CreateCannonBall Component', function() {
        var underTest, renderer, cannonBallFactory, model, aimHandle;

        beforeEach(function() {
            renderer = { $el: $('<div>') };
            renderer.parent = { $el: $('body') };

            cannonBallFactory = {
                create: function() {

                }
            };

            aimHandle = {
                show: function(){}
            };

            model = new Model();

            underTest = new CreateCannonBall();
            underTest.renderer = renderer;
            underTest.model = model;
            underTest.aimHandle = aimHandle;
            underTest.cannonBallFactory = cannonBallFactory;

            var sandbox = sinon.sandbox.create();
            sandbox.stub(cannonBallFactory,'create');
            sandbox.stub(aimHandle,'show');
        });

        describe('When Start Button Renderer is clicked', function() {
            describe('If model enableFireButton is true', function() {
                it('should create the cannonBall entity', function() {
                    underTest.start();
                    renderer.$el.click();
                    expect(cannonBallFactory.create.calledOnce).to.equal(true);
                    expect(aimHandle.show.calledOnce).to.equal(true);
                });
            });
            describe('If model enableFireButton is false', function() {
                it('should not create the cannonBall entity', function() {
                    underTest.start();
                    model.setEnableFireButton(false);
                    renderer.$el.click();
                    expect(cannonBallFactory.create.calledOnce).to.equal(false);
                });
            });
        });
    });
});