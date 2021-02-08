define(function(require){
    var Point = require('utils/Point');

    var DraggableToModel = function(){
        this.model = null;
        this.renderer = null;
        this.validator = null;
        this.xKey = '';
        this.yKey = '';
        this.offsetX = 0;
        this.offsetY = 0;
    };

    DraggableToModel.prototype.start = function() {
        this.renderer.$el.on('drag', syncToModel.bind(this));
    };

    var syncToModel = function(event, ui) {
        var point = new Point(ui.position.left + this.offsetX, this.offsetY - ui.position.top);

        ui.position.left = ui.position.top = 0;

        this.validator.validate(point);
        this.renderer.x = point.x - this.offsetX;
        this.renderer.y = this.offsetY - point.y;

        this.model.setValue(this.xKey, point.x, { silent: true });
        this.model.setValue(this.yKey, point.y, { silent: true });
        this.model.trigger('change');
    };

    return DraggableToModel;

});