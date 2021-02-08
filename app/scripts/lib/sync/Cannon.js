define(function (require) {

    var util = require('util');
    var GLOBAL = require('constants/Global');

    var Cannon = function () {
        this.velocityModel = null;
        this.angleModel = null;
        this.cannonModel = null;
    };

    Cannon.prototype.start = function () {

        updateCannon.call(this);
        this.velocityModel.on('change:val', updateCannon, this);
        this.angleModel.on('change:val', updateCannon, this);

    };

    Cannon.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.inputModel, this);
    };

    var updateCannon = function () {

        var initialXVelocity = this.velocityModel.getVal() * Math.cos(this.angleModel.getVal() * Math.PI / 180);
        var initialYVelocity = this.velocityModel.getVal() * Math.sin(this.angleModel.getVal() * Math.PI / 180);

        var yVelocityAfter10sec = Math.round((initialYVelocity - GLOBAL.GRAVITY * 10) * 10) / 10;
        var radiusOfCurvature = Math.round((Math.pow(initialXVelocity, 2) + Math.pow(yVelocityAfter10sec, 2) / (GLOBAL.GRAVITY * Math.cos(Math.atan2(yVelocityAfter10sec, initialXVelocity)))) * 10) / 10;

        this.cannonModel.setYVelocityAfter10sec(yVelocityAfter10sec);
        this.cannonModel.setRadiusOfCurvature(radiusOfCurvature);
    };

    return Cannon;

});
