define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');

    return ExtendedModel.extend({
        defaults: {
            targets: 0,
            showTooltip: true,
            allowTargetDrag: false,
            allowTargetTooltips: true
        },

        getTargets: function() { return this.get('targets'); },
        setTargets: function(value) { this.set('targets', value); }

    });
});