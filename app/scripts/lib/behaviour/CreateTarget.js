define(function(require) {
    var ComponentLibrary = require('ComponentLibrary'),
        SceneManager = require('SceneManager'),
        REFERENCES = require('constants/References');

    var CreateTarget = function() {
        this.targetFactory = null;
        this.targetsModel = null;
        this.renderer = null;
        this.entities = [];
    };

    CreateTarget.prototype.start = function() {
        this.targetsModel.on('change:targets',syncFromModel,this);
        syncFromModel.call(this);
    };

    var syncFromModel = function() {
        for(var i = 0, x = this.entities.length; i < x; i++) {
            this.entities[i].destroy();
        }

        var totalTargets = this.targetsModel.getTargets();
        for(var ii = 0, xx = totalTargets; ii < xx; ii++) {
            createTarget.call(this,ii+1);
        }
    };

    var createTarget = function(index) {
        var references = {};
        references[REFERENCES.INDEX] = index;

        var target = this.targetFactory.create({ name: 'target-'+index, references: references });
        this.renderer.entity.addChild(target);
        this.entities.push(target);
    };

    return CreateTarget;
});