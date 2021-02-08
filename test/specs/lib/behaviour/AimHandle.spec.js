define(function(require){

    var AimHandle = require('lib/behaviour/AimHandle');
    var Capi = require('lib/capi/Aim');
    var Model = require('lib/model/Aim');


    describe('AimHandle', function(){
        var underTest, model, capi;

        beforeEach(function(){

            model = new Model();
            capi = new Capi();

            underTest = new AimHandle();
            underTest.model = model;
            underTest.capi = capi;
        });

        describe('start', function(){
            it('should set the initial value of capi to the model', function(){
                capi.set('showHandle', true);
                underTest.start();

                expect(model.get('showHandle')).to.equal(true);
            });

            it('should add a change listener so when capi changes, the model also gets updated', function(){
                capi.set('showHandle', true);
                underTest.start();
                capi.set('showHandle', false);

                expect(model.get('showHandle')).to.equal(false);
            });
        });

        describe('show', function(){
            it('should set the value given to the model', function(){
                capi.set('showHandle', true);
                underTest.start();

                underTest.show(false);
                expect(model.get('showHandle')).to.equal(false);
            });
        });

        describe('reset', function(){
            it('should set the the current value of capi to the model', function(){
                capi.set('showHandle', true);
                underTest.start();

                underTest.show(false);
                underTest.reset();
                expect(model.get('showHandle')).to.equal(true);
            });
        });

    });
});