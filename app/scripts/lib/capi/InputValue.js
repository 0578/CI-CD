define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var adapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();

    return ExtendedModel.extend({
        defaults: {
            val: 0,
            minVal: 0,
            maxVal: 0,
            show: true,
            allowEdit: true
        },

        start: function(){
            this.setMinVal(this.minValue);
            this.setMaxVal(this.maxValue);

            adapter.expose('val', this, { alias: 'Cannon Data.' + this.alias, description: this.alias + ' value'});
            adapter.expose('minVal', this, { alias: 'Cannon Data.Min ' + this.alias, description: 'Minim ' + this.alias + ' value'});
            adapter.expose('maxVal', this, { alias: 'Cannon Data.Max ' + this.alias, description: 'Maxim ' + this.alias + ' value'});
            adapter.expose('show', this, { alias: 'Cannon InfoPanel.Show ' + this.alias, description: this.alias + ' visibility'});
            adapter.expose('allowEdit', this, { alias: 'Cannon InfoPanel.Allow ' + this.alias + ' Change', description: 'Allow change of ' + this.alias + ' value'});
        },

        getVal: function() { return this.get('val'); },
        setVal: function(value) { this.set('val', value); },

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