define(function(require) {
    var GLOBAL = require('constants/Global');
    var ORIGIN = require('constants/Origin');

    var UpdateBall = function() {
        this.angleModel = null;
        this.velocityModel = null;
        this.aimHandle = null;
        this.model = null;
    };

    UpdateBall.prototype.start = function() {
        this.timerCount = 0;
        this.model.setBallVisible(true);
    };

    UpdateBall.prototype.update = function(time) {
        if (!this.model.getBallVisible()) {
            enableFireButton.call(this);
            this.entity.destroy();
            return;
        }
        var angle = this.angleModel.getVal() * Math.PI / 180;
        var exitVelocity = this.velocityModel.getVal();
        var xRange = GLOBAL.WIDTH - ORIGIN.X;
        var yRange = GLOBAL.HEIGHT - ORIGIN.Y;
        var speed = 10;
        this.timerCount += time.elapsed;
        var x = exitVelocity * Math.cos(angle) * this.timerCount / 1000 * speed;
        var y = x * Math.tan(angle) - GLOBAL.GRAVITY / 2 * Math.pow(x / (exitVelocity * Math.cos(angle)),2);

        x = x * ORIGIN.RATIO;
        y = y * ORIGIN.RATIO;

        this.model.set('ballX', x,{silent:true});
        this.model.set('ballY', y,{silent:true});
        this.model.trigger('change:ballX');
        this.model.trigger('change:ballY');

        if(x > xRange || y < -yRange) {
            enableFireButton.call(this);
            this.entity.destroy();
        }
    };

    var enableFireButton = function() {
        var bulletsLeft = this.model.getMaximumBullets() - this.model.getFiredBullets();
        if(bulletsLeft > 0 && !this.model.getLockSim()) {
            this.model.setEnableFireButton(true);
        }
        this.aimHandle.reset();
    };

    return UpdateBall;
});