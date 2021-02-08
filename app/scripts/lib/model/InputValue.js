define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');

    return ExtendedModel.extend({
        defaults: {
            val: 0,
            minVal: 0,
            maxVal: 0,
            show: null,
            allowEdit: null,
            focused: false
        },

        getVal: function() { return this.get('val'); },
        setVal: function(value, options) {
            this.set('val', value, options);
        },

        getMinVal: function() { return this.get('minVal'); },
        setMinVal: function(value) { this.set('minVal', value); },

        getMaxVal: function() { return this.get('maxVal'); },
        setMaxVal: function(value) { this.set('maxVal', value); },

        getShow: function() { return this.get('show'); },
        setShow: function(value) { this.set('show', value); },

        getAllowEdit: function() { return this.get('allowEdit'); },
        setAllowEdit: function(value) { this.set('allowEdit', value); }
    });
});