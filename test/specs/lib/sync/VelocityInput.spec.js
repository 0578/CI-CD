define(function(require){
    var sinon = require('sinon');
    var VelocityInput = require('lib/sync/VelocityInput');
    var InputModel = require('lib/model/InputValue');
    var AimModel = require('lib/model/Aim');

    describe('VelocityInput sync', function() {
        var underTest, aimModel, inputModel;
        var sandbox;

        beforeEach(function(){
            sandbox = sinon.sandbox.create();

            aimModel = new AimModel ({
                posX: 100,
                posY: 30,
                velocityFocused: false,
                angleFocused: false,
                show: true
            });

            inputModel = new InputModel({
                val: 33,
                minVal: 1,
                maxVal: 300,
                show: true,
                allowEdit: true,
                focused: false
            });

            underTest = new VelocityInput();
            underTest.inputModel = inputModel;
            underTest.aimModel = aimModel;
        });

        afterEach(function(){
            sandbox.restore();
        });

        describe('when start is called', function(){
            it('it should update the aim model x and y position', function(){
                underTest.start();
                expect(aimModel.getPosX()).to.be.closeTo(20.50196, 1e-5 );
                expect(aimModel.getPosY()).to.be.closeTo(6.15059, 1e-5 );
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

        describe('when the input velocity model value changes', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('it should update the aim model x and y position', function(){
                inputModel.setVal(44);
                expect(aimModel.getPosX()).to.be.closeTo(27.54951, 1e-5);
                expect(aimModel.getPosY()).to.be.closeTo(8.26485, 1e-5);
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
                inputModel.setVal(66);
                expect(listener.callCount).to.equal(1);
            });
        });

        describe('when aim position changes', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('it should update the velocity input value', function(){
                aimModel.setPosX(55);
                expect(inputModel.getVal()).to.be.closeTo(83.73754, 1e-5);
            });
        });

        describe('when aim position is equal to 0,0', function(){
            beforeEach(function(){
                underTest.start();
            });
            it('it should change the x position to 1', function(){
                aimModel.setPosX(0);
                aimModel.setPosY(0);
                expect(inputModel.getVal()).to.equal(1);
            });
        });
    });
});