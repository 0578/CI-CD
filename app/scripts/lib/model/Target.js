define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var GLOBAL = require('constants/Global');
    var ORIGIN = require('constants/Origin');

    var Target = ExtendedModel.extend({
        defaults: {
            id: null,
            x: 0,
            y: 0,
            visible: true,
            showTooltip: false,
            chippedTop: false,
            chippedBottom: false,
            destroyed: false,
            minX: 0,
            maxX: GLOBAL.WIDTH - ORIGIN.X - 11,
            minY: ORIGIN.Y - GLOBAL.HEIGHT + 17 + 8,
            maxY: ORIGIN.Y - 17,
            collisionX: 0,
            collisionY: 0,
            collisionYDiff: 0
        },

        start: function () {
            if (this.id) {
                this.setId(this.id);
            }
        }
    });

    return Target;
});
