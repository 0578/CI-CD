define(function(require) {

    var UpdateBall = require('lib/behaviour/UpdateVectors');
    var Model = require('lib/model/CannonBall');
    var InputModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('Vector Component', function() {
        var underTest, model, angleModel, velocityModel;

        beforeEach(function() {

            angleModel = new InputModel({
                val: 20
            });

            velocityModel = new InputModel({
                val: 10
            });

            model = new Model({ballX: 10, ballY: 10});

            underTest = new UpdateBall();
            underTest.angleModel = angleModel;
            underTest.velocityModel = velocityModel;
            underTest.model = model;
            underTest.start();
        });

        describe('Method update',function(){
            it('should increment timerCount', function() {
                underTest.update({
                    elapsed: 22
                });
                expect(underTest.timerCount).to.equal(22);
            });
            it('should update the vx value',function(){
                underTest.update({
                    elapsed: 22
                });
                var point = model.getValue('vx');
                expect(point.x).to.equal(12.34923155196477);
                expect(point.y).to.equal(10);
            });
            it('should update the vy value',function(){
                underTest.update({
                    elapsed: 22
                });
                var point = model.getValue('vy');
                expect(point.x).to.equal(10);
                expect(point.y).to.equal(10.344755958314172);
            });
            it('should update the vd value',function(){
                underTest.update({
                    elapsed: 22
                });
                var point = model.getValue('vd');
                expect(point.x).to.equal(12.34923155196477);
                expect(point.y).to.equal(10.344755958314172);
            });


            it('should update the an value',function(){
                underTest.update({
                    elapsed: 22
                });
                var point = model.getValue('an');
                expect(point.x).to.equal(15.74635067880028);
                expect(point.y).to.equal(-29.15670780369767);
            });
            it('should update the at value',function(){
                underTest.update({
                    elapsed: 22
                });
                var point = model.getValue('at');
                expect(point.x).to.equal(4.2536493211997195);
                expect(point.y).to.equal(9.156707803697678);
            });
            it('should update the ad value',function(){
                underTest.update({
                    elapsed: 22
                });
                var point = model.getValue('ad');
                expect(point.x).to.equal(10);
                expect(point.y).to.equal(-30);
            });
        });
    });
});