define(function (require) {

    var util = require('util');
    var ORIGIN = require('constants/Origin');

    var Flight = function () {
        this.velocityModel = null;
        this.angleModel = null;
        this.cannonModel = null;
        this.targetModel = null;
    };

    Flight.prototype.start = function () {
        this.targetModel.on('change:destroyed', updateFlight, this);
    };

    Flight.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.targetModel, this);
    };

    var updateFlight = function () {
        var initialXVelocity = this.velocityModel.getVal() * Math.cos(this.angleModel.getVal() * Math.PI / 180);
        var initialYVelocity = this.velocityModel.getVal() * Math.sin(this.angleModel.getVal() * Math.PI / 180);
        var timeOfFlight = initialXVelocity > 0 ? this.targetModel.getCollisionX() / (ORIGIN.RATIO * initialXVelocity) : 0;
        var distanceTravelled = timeOfFlight * initialXVelocity;

        this.cannonModel.setInitialXVelocity(Math.round(initialXVelocity * 100) / 100);
        this.cannonModel.setInitialYVelocity(Math.round(initialYVelocity * 100) / 100);
        this.cannonModel.setTimeOfFlight(Math.round(timeOfFlight * 100) / 100);
        this.cannonModel.setDistanceTravelled(Math.round(distanceTravelled * 100) / 100);

        var differenceInY = (this.targetModel.getCollisionY() - this.targetModel.getY()) / ORIGIN.RATIO;
        this.targetModel.setCollisionYDiff(Math.round(differenceInY * 10) / 10);
    };

    return Flight;

});
