define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var adapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();

    return ExtendedModel.extend({
        defaults: {
            showHandle: true,
            showGuidelines: true
        },

        start: function(){
            adapter.expose('showHandle', this, { alias: 'Cannon InfoPanel.Show Controller Handle', description: 'Controller Handle visibility'});
            adapter.expose('showGuidelines', this, { alias: 'Cannon InfoPanel.Show GuideLines', description: 'GuideLines visibility'});
        },

        getShowHandle: function() { return this.get('showHandle'); },
        setShowHandle: function(value) { this.set('showHandle', value); },

        getShowGuidelines: function() { return this.get('showGuidelines'); },
        setShowGuidelines: function(value) { this.set('showGuidelines', value); }
    });
});