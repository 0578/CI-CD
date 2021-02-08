define(function(require){
    var $ = require('jquery');
    var sinon = require('sinon');
    var DragTarget = require('lib/behaviour/DragTarget');
    var Model = require('lib/model/Target');
    var TargetsModel = require('lib/model/Targets');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');
    var TargetPosition = require('lib/validator/TargetPosition');
    var ORIGIN = require('constants/Origin');

    describe('DragTarget', function() {
        var underTest, targetsModel, model, renderer, validator;
        var sandbox;
        var $body = $('body');

        beforeEach(function(){
            sandbox = sinon.sandbox.create();

            renderer = new HtmlRenderer();
            renderer.initialize();
            renderer.parent = { $el: $body };
            renderer.start();

            model = new Model();
            targetsModel = new TargetsModel({
                allowTargetDrag: true
            });

            validator = new TargetPosition();
            sandbox.stub(validator, 'validate');

            underTest = new DragTarget();
            underTest.model = model;
            underTest.targetsModel = targetsModel;
            underTest.renderer = renderer;
            underTest.validator = validator;
            underTest.offsetX = -ORIGIN.X;
            underTest.offsetY = ORIGIN.Y;
        });

        afterEach(function(){
            renderer.destroy();
            sandbox.restore();
        });

        describe('when target is dragged', function(){
            var ui;
            beforeEach(function(){
                ui = {
                    position: {
                        left: 100,
                        top: 100
                    },
                    originalPosition: {
                        left: 0,
                        top: 0
                    }
                };
                underTest.start();
            });

            it('it should update the renderer\'s model x and y position', function(){
                renderer.$el.trigger('drag', ui);
                expect(model.getX()).to.equal(100 - ORIGIN.X);
                expect(model.getY()).to.equal(-(100 - ORIGIN.Y));
            });

            it('should fire a change event on the target model', function(){
                var listener = sandbox.stub();
                model.on('change:x change:y', listener);
                renderer.$el.trigger('drag', ui);
                expect(listener.callCount).to.equal(2);
            });

            it('should not allow drag if allowDragTarget is false', function(){
                targetsModel.setAllowTargetDrag(false);
                renderer.$el.trigger('drag', ui);
                expect(model.getX()).to.equal(-ORIGIN.X);
                expect(model.getY()).to.equal(ORIGIN.Y);
            });

        });



        describe('when event dragstart fires', function() {
            it('should update model showTooltip', function () {
                targetsModel.setShowTooltip(false);
                renderer.$el.trigger('dragstart');
                expect(model.getShowTooltip()).to.equal(false);
            });
        });

        describe('when event dragstop fires', function() {
            it('should update model showTooltip to false', function(){
                renderer.$el.trigger('dragstop');
                expect(model.getShowTooltip()).to.equal(false);
            });
        });



    });
});