define(function(){

    var TooltipPositioner = function(){
        this.target = null;
        this.renderer = null;
    };

    TooltipPositioner.prototype.start = function(){

        this.position = {
            x: 0,
            y: 0
        };

        updatePosition.call(this);

    };

    TooltipPositioner.prototype.update = function(){

        if(this.position.x === this.target.x && this.position.y === this.target.y) return;

        updatePosition.call(this);

    };

    function updatePosition(){
        this.position.x = this.target.x;
        this.position.y = this.target.y;

        this.renderer.x = this.position.x;
        this.renderer.y = this.position.y;

        this.renderer.$el.toggleClass('right', this.renderer.x < 198);
    }

    return TooltipPositioner;

});