define(function(require) {
    var util = require('util');

    var UpdateFiredBullets = function() {
        this.renderer = null;
        this.model = null;
    };

    UpdateFiredBullets.prototype.start = function() {
        this.renderer.$el.on('click.'+this.UID, updatFiredBullets.bind(this));
    };

    UpdateFiredBullets.prototype.destroy = function() {
        util.deregisterRendererEvent(this.renderer, this.UID);
    };

    var updatFiredBullets = function() {
        var currentFiredBullets = this.model.getFiredBullets();
        if(this.model.getEnableFireButton()) {
            this.model.setFiredBullets(currentFiredBullets + 1);
        }
    };

    return UpdateFiredBullets;
});