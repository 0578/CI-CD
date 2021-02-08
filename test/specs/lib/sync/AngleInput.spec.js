define(function(require){
    var sinon = require('sinon');
    var AngleInput = require('lib/sync/AngleInput');
    var InputModel = require('lib/model/InputValue');
    var AimModel = require('lib/model/Aim');

    describe('AngleInput sync', function() {
        var underTest, aimModel, inputModel;
        var sandbox;

        beforeEach(function(){
            sandbox = sinon.sandbox.create();

            aimModel = new AimModel ({
                posX: 100,
                posY: 50,
                velocityFocused: false,
                angleFocused: false,
                show: true
            });

            inputModel = new InputModel({
                val: 30,
                minVal: 1,
                maxVal: 300,
                show: true,
                allowEdit: true,
                focused: false
            });


            underTest = new AngleInput();
            underTest.inputModel = inputModel;
            underTest.aimModel = aimModel;
        });

        afterEach(function(){
            sandbox.restore();
        });

        describe('when start is called', function(){
            it('it should update the aim model x and y position', function(){
                underTest.start();
                expect(aimModel.getPosX()).to.be.closeTo(96.82458, 1e-5);
                expect(aimModel.getPosY()).to.be.closeTo(55.90169, 1e-5);
            });

            it('should fire a change event on the aim model X position', function(){
                var listener =  sandbox.stub();
                aimModel.on('change:posX', listener);
                underTest.start();
                expect(listener.callCount).to.equal(1);
            });

            it('should fire a change event on the aim model Y position', function(){
                var listener =  sandbox.stub();
                aimModel.on('change:posY', listener);
                underTest.start();
                expect(listener.callCount).to.equal(1);
            });
        });

        describe('when the input angle model value changes', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('it should update the aim model x and y position', function(){
                inputModel.setVal(44);
                expect(aimModel.getPosX()).to.be.closeTo(80.42463, 1e-5);
                expect(aimModel.getPosY()).to.be.closeTo(77.66516, 1e-5);
            });

            it('should fire a change event on the aim model X position', function(){
                var listener =  sandbox.stub();
                aimModel.on('change:posX', listener);
                inputModel.setVal(55);
                expect(listener.callCount).to.equal(1);
            });

            it('should fire a change event on the aim model Y position', function(){
                var listener =  sandbox.stub();
                aimModel.on('change:posY', listener);
                underTest.start();
                expect(listener.callCount).to.equal(1);
            });
        });

        describe('when aim position changes', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('it should update the angle input value', function(){
                aimModel.setPosX(55);
                expect(inputModel.getVal()).to.be.closeTo(45.46583, 1e-5);
            });
        });

        describe('when aim position is equal to 0,0', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('it should set the input angle value to 0', function(){
                aimModel.setPosX(0);
                aimModel.setPosY(0);
                expect(inputModel.getVal()).to.equal(0);
            });
        });
    });
});