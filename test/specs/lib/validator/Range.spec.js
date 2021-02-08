define(function(require){
    var RangeValidator = require('lib/validator/Range');
    var Model = require('lib/model/InputValue');

    describe('Range validation', function() {
        var underTest, model, value, minValue, maxValue;

        beforeEach(function() {
            model = new Model({
                val: 33,
                minVal: 10,
                maxVal: 100,
                show: true,
                allowEdit: true
            });

            value = 'val';
            minValue = 'minVal';
            maxValue = 'maxVal';

            underTest = new RangeValidator();
            underTest.model = model;
            underTest.value = value;
            underTest.minValue = minValue;
            underTest.maxValue = maxValue;
        });

        afterEach(function(){
            model.destroy();
        });

        describe('when model value changes with a number between minValue and maxValue', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('should update the model value with the same value', function(){
                model.setVal(22);
                expect(model.getVal()).to.equal(22);
            });
        });

        describe('when model value changes with a number less than minVal', function() {
            beforeEach(function(){
                underTest.start();
            });
            it('should update the model value with the minVal', function() {
                model.setVal(3);
                expect(model.getVal()).to.equal(10);
            });
        });

        describe('when model value changes with a number greater than maxVal', function() {
            beforeEach(function(){
                underTest.start();
            });
            it('should update the model value with the maxVal', function() {
                model.setVal(111);
                expect(model.getVal()).to.equal(100);
            });
        });

        describe('when model minValue changes with a number greater than model value', function() {
            beforeEach(function(){
                underTest.start();
            });
            it('should update the model value with the model minVal', function() {
                model.setVal(44);
                model.setMinVal(50);
                expect(model.getVal()).to.equal(50);
            });
        });

        describe('when model maxValue changes with a number less than model value', function() {
            beforeEach(function(){
                underTest.start();
            });
            it('should update the model value with the model maxVal', function() {
                model.setVal(55);
                model.setMaxVal(50);
                expect(model.getVal()).to.equal(50);
            });
        });
    });
});