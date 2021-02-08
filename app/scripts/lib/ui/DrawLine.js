define(function (require) {

    var ORIGIN = require('constants/Origin');
    var GLOBAL = require('constants/Global');

    var DrawLine = function () {
        this.renderer = null;
        this.model = null;
        this.fromX = null;
        this.fromY = null;
        this.to = null;
        this.color = null;
        this.lineWidth = 1;
        this.modelKey = null;

    };

    DrawLine.prototype.start = function () {
        this.canvas = this.renderer.$el.get(0);
        this.ctx = this.canvas.getContext("2d");

        this.model.on('change:' + this.modelKey, draw, this);

        initCanvas.call(this);
    };

    var initCanvas = function () {
        var groundOffset = 8;

        this.canvas.height = GLOBAL.HEIGHT - groundOffset;
        this.canvas.width = GLOBAL.WIDTH;
    };
    var draw = function () {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = this.color;

        this.ctx.lineWidth = this.lineWidth;

        var y = -(this.model.getValue(this.fromY) - ORIGIN.Y);
        var x = this.model.getValue(this.fromX) + ORIGIN.X;

        var to = this.model.get(this.to);

        var toY = -(to.y - ORIGIN.Y);
        var toX = to.x + ORIGIN.X;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();

    };

    return DrawLine;
});
