define(function(require) {
    var util = require('util');

    var DragTarget = function() {
        this.renderer = null;
        this.model = null;
        this.targetsModel = null;
        this.validator = null;
        this.offsetX = 0;
        this.offsetY = 0;
    };

    DragTarget.prototype.start = function() {
        this.renderer.$el.on('dragstart',startDrag.bind(this));
        this.renderer.$el.on('drag',dragTarget.bind(this));
        this.renderer.$el.on('dragstop',stopDrag.bind(this));
    };

    DragTarget.prototype.destroy = function() {
        this.renderer.deregisterRendererEvent(this.renderer, this.UID);
    };

    var dragTarget = function(event,ui) {
        var position = {
            x: ui.position.left + this.offsetX,
            y: this.offsetY - ui.position.top
        };

        ui.position.left = ui.position.top = 0;
        this.validator.validate(position);

        if(!this.targetsModel.getAllowTargetDrag()) {
            position.x = ui.originalPosition.left + this.offsetX;
            position.y =  this.offsetY - ui.originalPosition.top;
        }

        this.model.setValue('x', position.x, {silent: true});
        this.model.setValue('y', position.y, {silent: true});
        this.model.trigger('change:x');
        this.model.trigger('change:y');
    };

    var startDrag = function() {
        if(this.targetsModel.getShowTooltip()) {
            this.model.setShowTooltip(true);
        }
    };

    var stopDrag = function() {
        this.model.setShowTooltip(false);
    };

    return DragTarget;
});