define(function(require){
    var $ = require('jquery');
    var sinon = require('sinon');
    var DraggableToModel = require('lib/sync/DraggableToModel');
    var Model = require('lib/model/Aim');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');
    var ValidatorAimPosition = require('lib/validator/AimPosition');
    var ORIGIN = require('constants/Origin');

    describe('DraggableToModel sync', function() {
        var underTest, model, renderer, validator;
        var sandbox;
        var $body = $('body');

        beforeEach(function(){
            sandbox = sinon.sandbox.create();

            renderer = new HtmlRenderer();
            renderer.initialize();
            renderer.parent = { $el: $body };
            renderer.start();

            model = new Model ({
                posX: 100,
                posY: 30,
                velocityFocused: false,
                angleFocused: false,
                show: true
            });

            validator = new ValidatorAimPosition();
            sandbox.stub(validator, 'validate');

            underTest = new DraggableToModel();
            underTest.model = model;
            underTest.renderer = renderer;
            underTest.validator = validator;
            underTest.xKey = 'posX';
            underTest.yKey = 'posY';
            underTest.offsetX = -ORIGIN.X;
            underTest.offsetY = ORIGIN.Y;
        });

        afterEach(function(){
            renderer.destroy();
            sandbox.restore();
        });

        describe('when aim is dragged', function(){
            var ui;
            beforeEach(function(){
                ui = {
                    position: {
                        left: 104,
                        top: 200
                    }
                };
                underTest.start();
            });

            it('it should update the renderer translate x and y position', function(){
                renderer.$el.trigger('drag', ui );
                expect(renderer.x).to.equal(104);
                expect(renderer.y).to.equal(200);
            });

            it('it should update the aim model x and y position', function(){
                renderer.$el.trigger('drag', ui );
                expect(model.getPosX()).to.equal(30);
                expect(model.getPosY()).to.equal(102);
            });

            it('should fire a change event on the aim model', function(){
                var listener =  sandbox.stub();
                model.on('change', listener);
                renderer.$el.trigger('drag', ui );
                expect(listener.callCount).to.equal(1);
            });
        });

    });
});