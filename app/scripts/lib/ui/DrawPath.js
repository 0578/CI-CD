define(function(require){
    var ORIGIN = require('constants/Origin'),
        GLOBAL = require('constants/Global'),
        util = require('util');

    var drawOffset = 2;

    var DrawPath = function(){
        this.angleModel = null;
        this.velocityModel = null;
        this.renderer = null;
    };

    DrawPath.prototype.start = function(){
        this.canvas = this.renderer.$el.get(0);
        this.ctx = this.canvas.getContext("2d");

        this.angleModel.on('change:val',updatePath,this);
        this.velocityModel.on('change:val',updatePath,this);

        initCanvas.call(this);
        updatePath.call(this);
    };

    DrawPath.prototype.destroy = function(){
        util.deregisterRendererEvent(this.renderer, this.UID);
        util.deregisterBackboneEvent(this.angleModel, this);
        util.deregisterBackboneEvent(this.velocityModel, this);
    };

    var initCanvas = function() {
        var groundOffset = 8;

        this.canvas.height = GLOBAL.HEIGHT - groundOffset;
        this.canvas.width = GLOBAL.WIDTH;
    };

    var updatePath = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawPath.call(this);
    };

    var drawPath = function() {
        var originX = ORIGIN.X, originY = ORIGIN.Y + 2,
            angle = this.angleModel.getVal() * Math.PI / 180,
            exitVelocity = this.velocityModel.getVal(),
            x = 0, y = 0,
            i = 0,
            pixelToMeterRatio = ORIGIN.RATIO;

        this.ctx.beginPath();
        this.ctx.moveTo(originX, originY);

        do {
            i+= 1 / pixelToMeterRatio;
            x = (i * pixelToMeterRatio) + originX;
            y = (i * Math.tan(angle) - GLOBAL.GRAVITY / 2 * Math.pow(i / (exitVelocity * Math.cos(angle)), 2)) * pixelToMeterRatio - (originY - drawOffset);
            this.ctx.lineTo(x, -y);
        }
        while (x < GLOBAL.WIDTH && y > -GLOBAL.HEIGHT);

        this.ctx.strokeStyle = "#A3A3A3";
        this.ctx.stroke();
    };

    return DrawPath;
});
