define(function (require) {
    var util = require('util');

    var LockDraggable = function () {
        this.renderer = null;
        this.model = null;
    };

    LockDraggable.prototype.start = function () {
        this.model.on('change:lockSim', lockDraggable, this);
    };

    LockDraggable.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.model, this);
    };

    var lockDraggable = function () {
        this.renderer.$el.draggable({'disabled': this.model.getLockSim()});
    };

    return LockDraggable;
});