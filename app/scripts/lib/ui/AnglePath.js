define(function(require){
    var util = require('util');
    var ORIGIN = require('constants/Origin');

    var AnglePath = function() {
        this.renderer = null;
        this.model = null;
        this.angleModel = null;
        this.focusModel = null;
    };

    AnglePath.prototype.start = function() {
        this.canvas = this.renderer.$el.get(0);
        this.ctx = this.canvas.getContext('2d');

        this.model.on('change:posX change:posY', syncFromModel, this);
        this.focusModel.on('change:focused', syncFromModel, this);
        syncFromModel.call(this);
    };

    AnglePath.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.model, this);
    };

    var syncFromModel = function () {
        var endAngle;
        var focus = this.focusModel.getFocused();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = focus ? 'rgba(7, 185, 237, 0.8)' : 'rgba(243, 243, 243, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5]);
        this.ctx.beginPath();
        this.ctx.moveTo(ORIGIN.X, ORIGIN.Y);
        this.ctx.lineTo(ORIGIN.X + ORIGIN.RADIUS, ORIGIN.Y );
        this.ctx.stroke();

        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        endAngle = - this.angleModel.getVal() * Math.PI / 180;
        this.ctx.arc(ORIGIN.X, ORIGIN.Y, 20,0, endAngle, true);
        this.ctx.stroke();
    };

    return AnglePath;
});