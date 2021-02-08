define(function(require){
    var $ = require('jquery');
    var sinon = require('sinon');
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var UpdateDistance = require('lib/behaviour/UpdateDistance');
    var ORIGIN = require('constants/Origin');

    describe('UpdateDistance', function(){
        var underTest, model, modelKey, renderer, modelValue;

        beforeEach(function(){
            modelValue = 234;
            model = new ExtendedModel();
            modelKey = 'x';
            renderer = { $el: $('<div></div>') };
            renderer.parent = { $el: $('body') };

            underTest = new UpdateDistance();
            underTest.model = model;
            underTest.modelKey = modelKey;
            underTest.renderer = renderer;
        });

        afterEach(function() {
            renderer.$el.remove();
        });

        function distance(value) {
            return (Math.round((value / ORIGIN.RATIO) * 100) / 100) + ' m';
        }

        describe('on start', function(){
            beforeEach(function() {
                model.setValue(modelKey, modelValue);
            });
            it('it should update the text with distance from model', function(){
                underTest.start();
                expect(renderer.$el.text()).to.equal(distance(modelValue));
            });
        });

        describe('when model value changes', function(){
            beforeEach(function(){
                model.setValue(modelKey, modelValue);
                underTest.start();
            });

            it('it should update the text with distance from model', function(){
                var newModelValue = 123;
                model.setValue(modelKey, newModelValue);
                expect(renderer.$el.text()).to.equal(distance(newModelValue));
            });
        });
    });
});