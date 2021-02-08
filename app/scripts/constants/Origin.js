define(function(){
    var origin = {};

    Object.defineProperty(origin, 'X', { value: 74, enumerable: true });
    Object.defineProperty(origin, 'Y', { value: 302, enumerable: true });
    Object.defineProperty(origin, 'RADIUS', { value: 200, enumerable: true });
    Object.defineProperty(origin, 'RATIO', { value: 0.1, enumerable: true });

    var valueArray = [];
    var keyArray = [];

    for(var i in origin){
        valueArray.push(origin[i]);
        keyArray.push(i);
    }

    Object.defineProperty(origin, 'valuesArray', {
        get: function(){ return valueArray; }
    });

    Object.defineProperty(origin, 'keysArray', {
        get: function(){ return keyArray; }
    });

    return origin;
});