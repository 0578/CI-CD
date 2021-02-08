define(function(){
    var TargetPosition = function() {
        this.parentWidth = 0;
        this.parentHeight = 0;
        this.objectOffsetX = 0;
        this.objectOffsetY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.groundHeight = 0;
    };

    TargetPosition.prototype.validate = function(positionPoint) {
        positionPoint.x = Math.min(Math.max(positionPoint.x, 0), this.parentWidth - this.offsetX - this.objectOffsetX);
        positionPoint.y = Math.min(Math.max(positionPoint.y, this.offsetY - this.parentHeight + this.objectOffsetY + this.groundHeight), this.offsetY - this.objectOffsetY);
    };

    return TargetPosition;
});