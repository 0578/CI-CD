define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');

    return ExtendedModel.extend({
        defaults: {
            x: 0,
            y: 0
        },

        getX: function() { return this.get('x'); },
        setX: function(value) { this.set('x', value); },
        getY: function() { return this.get('y'); },
        setY: function(value) { this.set('y', value); }
    });
});