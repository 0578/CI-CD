define(function(require) {
    var ComponentLibrary = require('ComponentLibrary'); 

    function deregisterBackboneEvent(target, context) {
        if(target && target.off) target.off(null, null, context);
    }
    
    function deregisterEvent(target, UID) {
        if(target && target.off) target.off('.' + UID);
    }
    
    function deregisterRendererEvent(renderer, UID) {
        if(renderer) deregisterEvent(renderer.$el, UID);
    }

    function setComponentReference(entity, name, reference, target) {
        var Component = ComponentLibrary.getComponent(name);
        var instance = entity.getComponent(Component);

        instance[reference] = target;
    }
    
    function stopEvent(event) {
        event.stopPropagation();
    }
    
    return {
        deregisterEvent: deregisterEvent,
        deregisterRendererEvent: deregisterRendererEvent,
        deregisterBackboneEvent: deregisterBackboneEvent,
        setComponentReference: setComponentReference,
        stopEvent: stopEvent
    };
});
