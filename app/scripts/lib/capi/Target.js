define(function(require) {
    var ExtendedModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var adapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();

    var Target = ExtendedModel.extend({
        defaults: {
            id: null,
            x: 0,
            y: 0,
            visible: true,
            destroyed: false,
            collisionYDiff: 0
        },
        start: function () {
            if (this.id) {
                this.setId(this.id);
            }
            this.expose();
        },

        destroy:function(){
            this.unexpose();
        },

        expose: function () {
            adapter.expose('x', this, { alias: 'Target Data.Target ' + this.getValue('id') + '.X Position', description: 'Target X Position'});
            adapter.expose('y', this, {alias: 'Target Data.Target ' + this.getValue('id') + '.Y Position', description: 'Target Y Position'});
            adapter.expose('visible', this, {alias: 'Target Data.Target ' + this.getValue('id') + '.Visible', description: 'Target Visibility'});
            adapter.expose('destroyed', this, {alias: 'Target Data.Target ' + this.getValue('id') + '.Destroyed', description: 'If target is destroyed'});
            adapter.expose('collisionYDiff', this, {alias: 'Target Data.Target ' + this.getValue('id') + '.Difference in Y from Center', description: 'The difference in height between the center of the target and the collision point'});
        },

        unexpose: function () {
            adapter.unexpose('x', this);
            adapter.unexpose('y', this);
            adapter.unexpose('visible', this);
            adapter.unexpose('destroyed', this);
            adapter.unexpose('collisionYDiff', this);
        }
    });

    return Target;
});