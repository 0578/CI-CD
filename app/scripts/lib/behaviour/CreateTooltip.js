define(function(){

    var CreateTooltip = function(){
        this.tooltipCreator = null;

        this.renderer = null;
        this.model = null;
        this.targetsModel = null;
    };

    CreateTooltip.prototype.start = function(){
        this.renderer.$el.on('click.' +this.UID, create.bind(this));
    };

    function create(ev){
        ev.stopPropagation();

        if (!this.targetsModel.getAllowTargetTooltips()) {
            return;
        }

        if(!this.model.getShowTooltip()){
            this.tooltipCreator.create({
                renderer: this.renderer,
                model: this.model
            });

            this.model.setShowTooltip(!this.model.getShowTooltip());
        }
        else{
            this.tooltipCreator.destroyLast();
        }
    }

    return CreateTooltip;

});