define(function(){

    var ToggleRendererProperty = function(){
        this.models = null;
        this.modelKeys = null;
        this.renderer = null;
        this.modelKeyValues = null;
        this.propertyName = '';
    };

    ToggleRendererProperty.prototype.start = function(){
        for( var i =0; i < this.models.length; i++){
            this.models[i].on('change:' + this.modelKeys[i], toggleProperty, this);
        }
        toggleProperty.call(this);
    };

    ToggleRendererProperty.prototype.destroy = function() {
        for( var i =0; i < this.models.length; i++) {
            if (this.models[i] && this.models[i].off) {
                this.models[i].off(null, null, this);
            }
        }
    };


    var toggleProperty = function(){
        var toggle = false;
        for( var i =0; i < this.models.length; i++) {
            if( this.models[i].getValue(this.modelKeys[i]) === this.modelKeyValues[i]){
                toggle = true;
            }

        }
        this.renderer.$el.prop(this.propertyName, toggle);
    };

    return ToggleRendererProperty;
});