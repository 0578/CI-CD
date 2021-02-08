define(function (require) {
    var util = require('util');
    var Point = require('utils/Point');
    var ORIGIN = require('constants/Origin');

    var VelocityInput = function () {
        this.inputModel = null;
        this.cannonModel = null;
        this.aimModel = null;
    };

    VelocityInput.prototype.start = function () {
        this.inputModel.on('change:val', updateHandlePos, this);
        this.aimModel.on('change', updateVelocityInput, this);
        updateHandlePos.call(this);
    };

    VelocityInput.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.inputModel, this);
        util.deregisterBackboneEvent(this.aimModel, this);
    };

    function updateVelocityInput() {
        var point = new Point(this.aimModel.getPosX(), this.aimModel.getPosY());
        var distance = point.distance();
        var minVelocity = this.inputModel.getMinVal();
        var maxVelocity = this.inputModel.getMaxVal();
        var velocityRange = maxVelocity - minVelocity;
        var velocity = minVelocity + distance * velocityRange / ORIGIN.RADIUS;

        this.inputModel.setVal(velocity);
    }

    function updateHandlePos() {
        var direction = new Point(this.aimModel.getPosX(), this.aimModel.getPosY());
        if (direction.x === 0 && direction.y === 0) { direction.x = 1; }
        direction.normalize();

        var velocity = this.inputModel.getVal();
        var minVelocity = this.inputModel.getMinVal();
        var maxVelocity = this.inputModel.getMaxVal();
        var velocityRange = maxVelocity - minVelocity;
        var distance = (velocity - minVelocity) * ORIGIN.RADIUS / velocityRange;

        this.aimModel.setValue('posX', distance * direction.x, { silent: true });
        this.aimModel.setValue('posY', distance * direction.y, { silent: true });
        this.aimModel.trigger('change:posX');
        this.aimModel.trigger('change:posY');
    }

    return VelocityInput;
});