define(function() {

    var TargetHit = function() {
        this.renderer = null;
        this.model = null;
        this.cannonModel = null;
        this.centerRadius = 4;
        this.chipSize = 8;
    };

    TargetHit.prototype.start = function() {
        this.cannonModel.on('change:ballX  change:ballY', checkHit, this);
    };

    var checkHit = function() {
        if(this.model.getDestroyed()) { return; }

        var targetX = this.model.getX();
        var targetY = this.model.getY();
        var bulletX = this.cannonModel.getBallX();
        var bulletY = this.cannonModel.getBallY();

        if(bulletX > targetX - this.centerRadius && bulletX < targetX + this.centerRadius) {
            if(bulletY > targetY - this.centerRadius && bulletY < targetY + this.centerRadius) {
                this.cannonModel.setBallVisible(false);

                this.model.setCollisionX(bulletX);
                this.model.setCollisionY(bulletY);
                this.model.setDestroyed(true);
                
                if(this.cannonModel.getLockSimAfterDestroy()) {
                    this.cannonModel.setLockSim(true);
                }
            }

            if(bulletY > targetY + this.centerRadius && bulletY < targetY + this.centerRadius + this.chipSize && !this.model.getChippedTop()) {
                this.model.setChippedTop(true);
            }

            if(bulletY > targetY - this.centerRadius - this.chipSize && bulletY < targetY - this.centerRadius && !this.model.getChippedBottom()) {
                this.model.setChippedBottom(true);
            }
        }

    };

    return TargetHit;
});