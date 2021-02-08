define(function(require){
    var util = require('util');
    var ORIGIN = require('constants/Origin');

    var AimPath = function() {
        this.renderer = null;
        this.model = null;
        this.focusModel = null;
    };

    AimPath.prototype.start = function() {
        this.canvas = this.renderer.$el.get(0);
        this.ctx = this.canvas.getContext('2d');

        this.model.on('change:posX change:posY', syncFromModel, this);
        this.focusModel.on('change:focused', syncFromModel, this);
        syncFromModel.call(this);
    };

    AimPath.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.model, this);
    };

    var syncFromModel = function () {
        var focus = this.focusModel.getFocused();

        this.ctx.strokeStyle = focus ? 'rgba(7, 185, 237, 0.8)' : 'rgba(243, 243, 243, 0.8)';
        this.ctx.lineWidth = 3;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(ORIGIN.X, ORIGIN.Y);

        this.ctx.lineTo(ORIGIN.X + this.model.getPosX(), ORIGIN.Y - this.model.getPosY());
        this.ctx.stroke();
    };

    return AimPath;
});