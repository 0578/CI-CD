define(function(){
    'use strict';
    var Point = function(x, y){
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    };

    Point.prototype.getMagnitude = function(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

    Point.prototype.normalize = function(){
        var magnitude = this.getMagnitude();
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;

        return this;
    };

    Point.prototype.distanceTo = function(point){
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    };

    Point.prototype.angle = function(){
        return Point.toAngle(this.x, this.y);
    };

    Point.prototype.screenAngle = function(){
        return 90 - Point.toAngle(this.x, this.y);
    };

    Point.prototype.dot = function(point){
        return (this.x * point.x) + (this.y * point.y);
    };

    Point.prototype.clone = function(){
        return new Point(this.x, this.y);
    };

    Point.prototype.toString = function(){
        return this.x + ',' + this.y;
    };

    Point.prototype.distance = function(){
        return Point.distance(this.x, this.y);
    };

    Point.add = function(point1, point2){
        return new Point(point1.x +point2.x, point1.y + point2.y);
    };

    Point.subtract = function(point1, point2){
        return new Point(point1.x -point2.x, point1.y -point2.y);
    };

    Point.fromAngle = function(angle){
        var radians =  angle * Math.PI / 180;
        return new Point(Math.sin(radians), Math.cos(radians));
    };

    Point.fromScreenAngle = function(angle){
        var radians = (-angle + 90) * Math.PI / 180;
        return new Point(Math.sin(radians), Math.cos(radians));
    };

    Point.toAngle = function(x, y){
        return Math.atan2(x, y) * 180 / Math.PI;
    };

    Point.fromString = function(string){
        var coords = string.split(',');
        return new Point(coords[0], coords[1]);
    };

    Point.distance = function(x, y){
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    return Point;
});