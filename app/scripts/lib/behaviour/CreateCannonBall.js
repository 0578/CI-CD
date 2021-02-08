define(function() {

    var CreateCannonBall = function() {
        this.renderer = null;
        this.cannonBallFactory = null;
        this.model = null;
        this.aimHandle = null;
    };

    CreateCannonBall.prototype.start = function() {
        this.renderer.$el.on('click.'+this.UID, createCannonBall.bind(this));
    };

    CreateCannonBall.prototype.destroy = function() {
        if (this.renderer && this.renderer.$el && this.renderer.$el.off) {
            this.renderer.$el.off('.' + this.UID);
        }
    };

    var createCannonBall = function() {
        if(this.model.getEnableFireButton()) {
            this.cannonBallFactory.create();
            this.model.setEnableFireButton(false);
            this.aimHandle.show(false);
        }
    };

    return CreateCannonBall;
});