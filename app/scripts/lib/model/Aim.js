define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');

    return ExtendedModel.extend({
        defaults: {
            posX: 0,
            posY: 0,
            velocityFocused: false,
            angleFocused: false,
            showHandle: null,
            showGuidelines: null
        },

        getPosX: function() { return this.get('posX'); },
        setPosX: function(value, options) { this.set('posX', value, options); },

        getPosY: function() { return this.get('posY'); },
        setPosY: function(value, options) { this.set('posY', value, options); }

    });
});