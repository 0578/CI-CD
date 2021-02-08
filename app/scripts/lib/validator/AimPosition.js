define(function(require){
    var Point = require('utils/Point');
    var ORIGIN = require('constants/Origin');

    var AimPosition = function() {
        this.radius = 0;
        this.exitVelocityModel = null;
        this.angleModel = null;
    };

    AimPosition.prototype.validate = function(positionPoint) {
        var direction;

        positionPoint.x = Math.max(positionPoint.x, 1);
        positionPoint.y = Math.max(positionPoint.y, 0);

        if(!this.exitVelocityModel.getAllowEdit()) lockVelocity.call(this, positionPoint);
        if(!this.angleModel.getAllowEdit()) lockAngle.call(this, positionPoint);

        if(positionPoint.x === 0 && positionPoint.y === 0) return;

        direction = positionPoint.clone().normalize();

        if (positionPoint.distance() > this.radius) {
            positionPoint.x = this.radius * direction.x;
            positionPoint.y = this.radius * direction.y;
        }
    };

    function lockVelocity(positionPoint) {
        var velocity = this.exitVelocityModel.getVal();
        var minVelocity = this.exitVelocityModel.getMinVal();
        var maxVelocity = this.exitVelocityModel.getMaxVal();
        var velocityRange = maxVelocity - minVelocity;
        var distance = (velocity - minVelocity) * ORIGIN.RADIUS / velocityRange;
        positionPoint.normalize();
        positionPoint.x *= distance;
        positionPoint.y *= distance;
    }

    function lockAngle(positionPoint) {
        var angle = this.angleModel.getVal();
        var fixedDirection = Point.fromScreenAngle(angle).normalize();
        var distance = Point.distance(positionPoint.x, positionPoint.y);
        positionPoint.x = distance * fixedDirection.x;
        positionPoint.y = distance * fixedDirection.y;
    }

    return AimPosition;

});