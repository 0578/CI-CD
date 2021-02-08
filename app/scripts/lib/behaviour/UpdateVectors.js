define(function (require) {

    var GLOBAL = require('constants/Global');
    var ORIGIN = require('constants/Origin');

    var UpdateVectors = function () {
        this.angleModel = null;
        this.velocityModel = null;
        this.model = null;
    };

    UpdateVectors.prototype.start = function () {
        this.timerCount = 0;
    };

    UpdateVectors.prototype.update = function (time) {

        var timeScaleFactor = 0.266;

        this.timerCount += time.elapsed;


        var FPS = 45;
        var mag = 40;

        var currentTime = this.timerCount * 1 / FPS * 1.6;

        var scaledTime = currentTime * timeScaleFactor;

        var angle = this.angleModel.getVal() * Math.PI / 180;

        var exitVelocity = this.velocityModel.getVal();

        var vx = exitVelocity * Math.cos(angle);
        var vy = -(exitVelocity * Math.sin(angle) - GLOBAL.GRAVITY * scaledTime);

        vx = vx * ORIGIN.RATIO*2.5;
        vy = (-1)*vy * ORIGIN.RATIO*2.5;



        angle = Math.atan2(vy,vx);

        var px = mag * Math.cos(angle) * Math.sin(angle);

        //Normal Component Line
        var normalComponentLine = mag * Math.pow(Math.cos(angle), 2);

        //Tangential Component Line
        var tangentialComponentLine = mag * Math.pow(Math.sin(angle), 2);

        this.model.setValue('vx', { x: this.model.getValue('ballX')+vx, y : this.model.getValue('ballY') });
        this.model.setValue('vy', { x : this.model.getValue('ballX'), y : this.model.getValue('ballY')+vy });
        this.model.setValue('vd', { x : this.model.getValue('ballX')+vx, y : this.model.getValue('ballY')+vy });

        this.model.setValue('an', { x : this.model.getValue('ballX') + px, y : this.model.getValue('ballY')-normalComponentLine });
        this.model.setValue('at', { x : this.model.getValue('ballX') - px, y : this.model.getValue('ballY')-tangentialComponentLine });
        this.model.setValue('ad', { x : this.model.getValue('ballX'), y : this.model.getValue('ballY')-mag });

    };

    return UpdateVectors;
});
