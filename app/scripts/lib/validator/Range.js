define(function(){

    var Range = function() {
        this.model = null;
        this.value = '';
        this.minValue = '';
        this.maxValue = '';
    };

    Range.prototype.start = function() {
        this.model.on('change:' + this.value + ' change:' + this.minValue + ' change:' + this.maxValue, doValidation, this);
        doValidation.call(this);
    };

    Range.prototype.validate = function(value, minValue, maxValue) {
        return Math.min(Math.max(Math.round(value), minValue), maxValue);
    };

    var doValidation = function() {
        var val = this.validate(this.model.getValue(this.value), this.model.getValue(this.minValue), this.model.getValue(this.maxValue) );
        this.model.setValue(this.value, val);
    };

    return Range;

});