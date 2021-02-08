define(function(require){
    var AimPositionValidator = require('lib/validator/AimPosition');
    var InputModel = require('lib/model/InputValue');
    var Point = require('utils/Point');
    var ORIGIN = require('constants/Origin');

    describe('AimPosition validation', function() {
        var underTest, exitVelocityModel, angleModel, point;

        beforeEach(function() {
            point = new Point();
            point.x = 0;
            point.y = 0;

            exitVelocityModel = new InputModel({
                val: 100,
                minVal: 1,
                maxVal: 300,
                allowEdit: true
            });

            angleModel = new InputModel({
                val: 30,
                allowEdit: true
            });

            underTest = new AimPositionValidator();
            underTest.radius = 100;
            underTest.exitVelocityModel = exitVelocityModel;
            underTest.angleModel = angleModel;
        });

        describe('when a position of 0,0 is passed', function() {
            it('should return 1,0', function() {
                underTest.validate(point);
                expect(point.x).to.equal(1);
                expect(point.y).to.equal(0);
            });
        });

        describe('when a position coordinate less than 0 is passed', function() {
            it('should return x as 1 when x is negative', function() {
                point.x = -11;
                underTest.validate(point);
                expect(point.x).to.equal(1);
            });

            it('should return y as 0 when y is negative', function() {
                point.y = -12;
                underTest.validate(point);
                expect(point.y).to.equal(0);
            });
        });

        describe('when a position is passed with distance grater than radius', function() {
            it('should update the position to the radius', function() {
                point.x = 250;
                point.y = 225;
                underTest.validate(point);
                expect(point.x).to.be.closeTo(74.3294, 1e-4);
                expect(point.y).to.be.closeTo(66.8964, 1e-4);
            });
        });

        describe('when the velocity lock is changed', function() {
            beforeEach(function() {
                point.x = 5;
                point.y = 5;
            });
            it('should change the exit velocity if the velocity is not locked', function() {
                exitVelocityModel.setAllowEdit(true);
                var magnitude = point.getMagnitude();
                underTest.validate(point);
                expect(point.getMagnitude()).to.equal(magnitude);
            });
            it('should not change the exit velocity if the velocity is locked', function() {
                exitVelocityModel.setAllowEdit(false);
                underTest.validate(point);
                var distance = (exitVelocityModel.getVal() - 1) * ORIGIN.RADIUS / 299;
                expect(point.getMagnitude()).to.be.closeTo(distance, 1e-2);
            });
        });

        describe('when the angle lock is changed', function() {
            beforeEach(function() {
                point.x = 5;
                point.y = 5;
            });
            it('should change the angle if the angle is not locked', function() {
                angleModel.setAllowEdit(true);
                var angle = point.screenAngle();
                underTest.validate(point);
                expect(point.screenAngle()).to.equal(angle);
            });
            it('should not change the angle if the angle is locked', function() {
                angleModel.setAllowEdit(false);
                underTest.validate(point);
                expect(point.screenAngle()).to.be.closeTo(angleModel.getVal(), 1e-2);
            });
        });
    });
});