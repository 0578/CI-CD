define(function(){
    var Global = {};

    Object.defineProperty(Global, 'HEIGHT', { value: 500, enumerable: true });
    Object.defineProperty(Global, 'WIDTH', { value: 525, enumerable: true });
    Object.defineProperty(Global, 'GRAVITY', { value: 9.81, enumerable: true });

    return Global;
});