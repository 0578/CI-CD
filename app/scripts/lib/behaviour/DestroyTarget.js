define(function() {
    var DestroyTarget = function() {
        this.renderer = null;
        this.explosionRenderer = null;
        this.model = null;
    };

    DestroyTarget.prototype.start = function() {
        this.model.on('change:destroyed', destroyTarget, this);
    };

    var destroyTarget = function() {
        this.renderer.$el.addClass('destroyed');
        this.explosionRenderer.$el.addClass('animate');
    };

    return DestroyTarget;
});