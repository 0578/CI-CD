define(function (require) {
    var util = require('util');

    var LockSim = function () {
        this.model = null;
    };

    LockSim.prototype.start = function () {
        this.model.on('change:lockSimAfterDestroy', revertLockSim, this);
        revertLockSim.call(this);
    };

    LockSim.prototype.destroy = function () {
        util.deregisterBackboneEvent(this.model, this);
    };

    var revertLockSim = function() {
        if(!this.model.getLockSimAfterDestroy()) {
            this.model.setLockSim(false);
            this.model.setEnableFireButton(true);
        }
    };

    return LockSim;
});