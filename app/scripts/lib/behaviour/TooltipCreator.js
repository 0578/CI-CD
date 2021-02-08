define(function(require){

    var SceneManager = require('SceneManager');

    var TooltipCreator = function(){
        this.factory = null;
        this.container = SceneManager.ActiveScene;

        this.lastEntityCreated = null;
    };

    TooltipCreator.prototype.start = function(){
        this.container.$el.on('click.'+this.UID, function(e){
            this.destroyLast.call(this);
        }.bind(this));
    };

    TooltipCreator.prototype.create = function(references){

        this.destroyLast();

        this.lastEntityCreated = this.factory.create({references: references});
        this.lastModel = references.model;
    };

    TooltipCreator.prototype.destroyLast = function(){
        if(this.lastEntityCreated){
            this.lastModel.setShowTooltip(false);
            if(!this.lastEntityCreated.destroyed){
                this.lastEntityCreated.destroy();
            }
        }
    };

    return TooltipCreator;

});