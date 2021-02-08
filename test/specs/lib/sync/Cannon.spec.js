define(function(require){
    var InputModel = require('lib/model/InputValue');
    var CannonModel = require('lib/model/Cannon');
    var Cannon = require('lib/sync/Cannon');

    describe('Cannon component',function(){
        var underTest, velocity, angle, cannonModel;

        beforeEach(function(){
            velocity = new InputModel({val: 1});
            angle = new InputModel({val: 0});
            cannonModel = new CannonModel();

            underTest = new Cannon();
            underTest.angleModel = angle;
            underTest.velocityModel = velocity;
            underTest.cannonModel = cannonModel;

            underTest.start();
        });


        describe('when the component starts', function(){
            it('should calculate the yVelocityAfter10sec and set it to the cannon model',function(){
                expect(cannonModel.getYVelocityAfter10sec()).to.equal(-98.1);
            });
            it('should calculate the radiusOfCurvature and set it to the cannon model',function(){
                expect(cannonModel.getRadiusOfCurvature()).to.equal(96242.1);
            });
        });

        describe('when velocity is updated', function(){
            beforeEach(function(){
                underTest.velocityModel.setVal(2);
            });
            it('should calculate the yVelocityAfter10sec and set it to the cannon model',function(){
                expect(cannonModel.getYVelocityAfter10sec()).to.equal(-98.1);
            });
            it('should calculate the radiusOfCurvature and set it to the cannon model',function(){
                expect(cannonModel.getRadiusOfCurvature()).to.equal(48132);
            });
        });

        describe('when angle is updated', function(){
            beforeEach(function(){
                underTest.angleModel.setVal(45);
            });
            it('should calculate the yVelocityAfter10sec and set it to the cannon model',function(){
                expect(cannonModel.getYVelocityAfter10sec()).to.equal(-97.4);
            });
            it('should calculate the radiusOfCurvature and set it to the cannon model',function(){
                expect(cannonModel.getRadiusOfCurvature()).to.equal(133209.7);
            });
        });

    });
});
