define(function(){

    var Number = function() {
    };

    Number.prototype.validate = function(value) {
        value = parseFloat(value);
        if (isNaN(value)) { value = 0; }

        return value;
    };

    return Number;

});