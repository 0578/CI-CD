define(function (require) {
    var util = require('util');
    var Point = require('utils/Point');

    var AngleInput = function () {
        this.inputModel = null;
        this.cannonModel = null;
        this.aimModel = null;
    };

    AngleInput.prototype.start = function () {
        this.inputModel.on('change:val', updateHandlePos, this);
        this.aimModel.on('change', updateAngleInput, this);
        updateHandlePos.call(this);
    };

    AngleInput.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.inputModel, this);
        util.deregisterBackboneEvent(this.aimModel, this);
    };

    function updateAngleInput() {
        var point = new Point(this.aimModel.getPosX(), this.aimModel.getPosY());
        var angle = point.x !== 0 || point.y !== 0 ? point.screenAngle() : 0;
        this.inputModel.setVal(angle);
    }

    function updateHandlePos() {
        var x = this.aimModel.getPosX();
        var y = this.aimModel.getPosY();
        var angle = this.inputModel.getVal();

        var direction = Point.fromScreenAngle(angle).normalize();
        var distance = Point.distance(x, y);

        this.aimModel.setValue('posX', distance * direction.x, { silent: true });
        this.aimModel.setValue('posY', distance * direction.y, { silent: true });
        this.aimModel.trigger('change:posX');
        this.aimModel.trigger('change:posY');
    }

    return AngleInput;
});