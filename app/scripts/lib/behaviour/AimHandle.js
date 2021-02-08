define(function(){


    var AimHandle = function(){
        this.model = null;
        this.capi = null;
    };

    AimHandle.prototype.start = function(){
        this.capi.on('change:showHandle', update, this);
        update.call(this);
    };

    AimHandle.prototype.show = function(value){
        this.model.setShowHandle(value);
    };

    AimHandle.prototype.reset = function(){
        update.call(this);
    };

    function update(){
        this.model.setShowHandle(this.capi.getShowHandle());
    }

    return AimHandle;


});