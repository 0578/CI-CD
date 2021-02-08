define(function (require) {
    var ORIGIN = require('constants/Origin');

    var UpdateDistance = function () {
        this.renderer = null;
        this.model = null;
        this.modelKey = '';
    };

    UpdateDistance.prototype.start = function () {
        this.model.on('change:' + this.modelKey, setDistance, this);
        setDistance.call(this);
    };

    UpdateDistance.prototype.destroy = function () {
        if (this.model && this.model.off){
            this.model.off(null, null, this);
        }
    };

    function setDistance() {
        var distance = Math.round((this.model.getValue(this.modelKey) / ORIGIN.RATIO) * 100) / 100;
        this.renderer.$el.text(distance + ' m');
    }

    return UpdateDistance;
});