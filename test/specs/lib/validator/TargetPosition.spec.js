define(function(require){
    var TargetPosition = require('lib/validator/TargetPosition');
    var GLOBAL = require('constants/Global');
    var ORIGIN = require('constants/Origin');

    describe('TargetPosition validation', function() {
        var underTest, positionPoint;

        beforeEach(function() {
            positionPoint = {};
            positionPoint.x = 0;
            positionPoint.y = 0;

            underTest = new TargetPosition();
            underTest.parentWidth = GLOBAL.WIDTH;
            underTest.parentHeight = GLOBAL.HEIGHT;
            underTest.objectOffsetX = 11;
            underTest.objectOffsetY = 17;
            underTest.offsetX = ORIGIN.X;
            underTest.offsetY = ORIGIN.Y;
            underTest.groundHeight = 8;
        });

        describe('when a position of 0,0 is passed', function() {
            it('should return the same position', function() {
                positionPoint = {};
                positionPoint.x = 0;
                positionPoint.y = 0;

                underTest.validate(positionPoint);
                expect(positionPoint.x).to.equal(0);
                expect(positionPoint.y).to.equal(0);
            });
        });

        describe('when a position coordinate less than 0 is passed', function() {
            it('should return x as 0 when x is negative', function() {
                positionPoint.x = -11;
                underTest.validate(positionPoint);
                expect(positionPoint.x).to.equal(0);
            });

            it('should return maximum values when the values exceed the limitT', function() {
                positionPoint.x = 9999;
                positionPoint.y = 9999;
                underTest.validate(positionPoint);
                expect(positionPoint.x).to.equal(525 - underTest.offsetX - underTest.objectOffsetX);
                expect(positionPoint.y).to.equal(underTest.offsetY -  underTest.objectOffsetY);
            });

            it('should return minimum values when the values exceed the negative limits', function() {
                positionPoint.x = -9999;
                positionPoint.y = -9999;
                underTest.validate(positionPoint);
                expect(positionPoint.x).to.equal(0);
                expect(positionPoint.y).to.equal(underTest.offsetY - underTest.parentHeight  +  underTest.objectOffsetY + underTest.groundHeight);
            });
        });

    });
});