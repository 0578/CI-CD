define(function(require) {
    var util = require('util');

    var UpdateBulletsLeft = function() {
        this.renderer = null;
        this.model = null;
    };

    UpdateBulletsLeft.prototype.start = function() {
        this.model.on('change:firedBullets',updateBulletsLeft,this);
        this.model.on('change:maximumBullets',updateBulletsLeft,this);

        updateBulletsLeft.call(this);
    };

    UpdateBulletsLeft.prototype.destroy = function() {
        util.deregisterBackboneEvent(this.model, this);
    };

    var updateBulletsLeft = function() {
        var bulletsLeft = this.model.getMaximumBullets() - this.model.getFiredBullets();
        switch(bulletsLeft) {
            case 0:
                updateBulletsClass.call(this,'showNone');
                break;
            case 1:
                updateBulletsClass.call(this,'showOne');
                break;
            case 2:
                updateBulletsClass.call(this,'showTwo');
                break;
            default:
                updateBulletsClass.call(this,'showThree');
                break;
        }
    };

    var updateBulletsClass = function(className) {
        this.renderer.$el.attr('class','bullets ' + className);
    };

    return UpdateBulletsLeft;
});