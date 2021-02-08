define(function(require){
    var InputModel = require('lib/model/InputValue');
    var CannonModel = require('lib/model/Cannon');
    var TargetModel = require('lib/model/Target');
    var Flight = require('lib/sync/Flight');

    describe('Flight component',function(){
        var underTest, velocity, angle, cannon, target;

        beforeEach(function(){
            velocity = new InputModel();
            angle = new InputModel();
            cannon = new CannonModel();
            target = new TargetModel();

            underTest = new Flight();
            underTest.angleModel = angle;
            underTest.velocityModel = velocity;
            underTest.cannonModel = cannon;
            underTest.targetModel = target;

            underTest.start();
        });


        describe('when the target is destroyed starts', function(){
            beforeEach(function(){
                velocity.setVal(300);
                angle.setVal(40);
                target.setX(223);
                target.setCollisionX(222.35);
                target.setY(138);
                target.setCollisionY(140.658);
            });

            it('should calculate the initialXVelocity and initialYVelocity and set it to the cannon model',function(){
                target.setDestroyed(true);

                expect(cannon.getInitialXVelocity()).to.equal(229.81);
                expect(cannon.getInitialYVelocity()).to.equal(192.84);
            });
            it('should calculate the timeOfFlight and set it to the cannon model',function(){
                target.setDestroyed(true);

                expect(cannon.getTimeOfFlight()).to.equal(9.68);
            });
            it('should calculate the distanceTravelled and set it to the cannon model',function(){
                target.setDestroyed(true);

                expect(cannon.getDistanceTravelled()).to.equal(2223.5);
            });
            it('should calculate the difference from the collision Y and the center Y to 1 decimal place',function(){
                target.setDestroyed(true);

                expect(target.getCollisionYDiff()).to.equal(26.6);
            });
        });
    });
});
