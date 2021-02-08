define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var adapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();

    return ExtendedModel.extend({
        defaults: {
            targets: 0,
            showTooltip: true,
            allowTargetDrag: false,
            allowTargetTooltips: true
        },

        start: function(){
            adapter.expose('targets', this, { alias: 'Target.Number Of Targets', description: 'Number of total targets' });
            adapter.expose('showTooltip', this, {alias: 'Target.Show Target Info', description: 'Tooltip Visibility'});
            adapter.expose('allowTargetDrag', this, {alias: 'Target.Allow Target Position Change ', description: 'Allow Drag of Targets'});
            adapter.expose('allowTargetTooltips', this, {alias: 'Target.Allow Targets to Show Tooltips', description: 'Allow Targets to Show Tooltips on click'});
        },

        getTargets: function() { return this.get('targets'); },
        setTargets: function(value) { this.set('targets', value); }
    });
});