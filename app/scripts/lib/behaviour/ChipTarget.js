define(function() {
    var ChipTarget = function() {
        this.renderer = null;
        this.explosionRenderer = null;
        this.model = null;
    };

    ChipTarget.prototype.start = function() {
        this.model.on('change:chippedTop', chipTargetTop, this);
        this.model.on('change:chippedBottom', chipTargetBottom, this);
    };

    var chipTargetTop = function() {
        if(!this.model.getChippedBottom() && !this.model.getDestroyed()) {
            this.renderer.$el.removeClass().addClass('target chippedTop');
        } else if(this.model.getChippedBottom()) {
            this.renderer.$el.removeClass().addClass('target chipped');
        }
    };

    var chipTargetBottom = function() {
        if(!this.model.getChippedTop() && !this.model.getDestroyed()) {
            this.renderer.$el.removeClass().addClass('target chippedBottom');
        } else if(this.model.getChippedTop()) {
            this.renderer.$el.removeClass().addClass('target chipped');
        }
    };

    return ChipTarget;
});