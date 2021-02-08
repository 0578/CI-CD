define(function (require) {
    var $ = require('jquery');
    var TargetCollision = require('lib/behaviour/TargetCollision');
    var Model = require('lib/model/Target');
    var CannonModel = require('lib/model/Cannon');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('TargetCollision Component', function () {
        var underTest, model, cannonModel, renderer;

        var $body = $('body');
        beforeEach(function () {

            renderer = new HtmlRenderer();
            renderer.initialize();
            $body.append(renderer.$el);

            model = new Model({
                x: 200,
                y: 200
            });
            cannonModel = new CannonModel({
                lockSimAfterDestroy: false,
                lockSim: false
            });

            underTest = new TargetCollision();
            underTest.renderer = renderer;
            underTest.model = model;
            underTest.cannonModel = cannonModel;
            underTest.centerRadius = 4;
            underTest.chipSize = 8;

            underTest.start();
        });

        afterEach(function(){
            renderer.destroy();
        });

        describe('when model change:ballX change:ballY to the center of the target', function () {
            it('should set destroyed to true', function () {
                cannonModel.setBallX(201);
                cannonModel.setBallY(201);
                expect(model.getDestroyed()).to.equal(true);
            });

            it('should hide ball', function () {
                cannonModel.setBallVisible(true);
                cannonModel.setBallX(201);
                cannonModel.setBallY(201);
                expect(cannonModel.getBallVisible()).to.equal(false);
            });

            it('should set the exact coordinates of the collision on the target', function () {
                cannonModel.setBallX(201);
                cannonModel.setBallY(201);
                expect(model.getCollisionX()).to.equal(201);
                expect(model.getCollisionY()).to.equal(201);
            });

            describe('when model lockSimAfterDestroy is true', function () {
                it('should set model simLock to true', function () {
                    cannonModel.setLockSimAfterDestroy(true);
                    cannonModel.setBallX(201);
                    cannonModel.setBallY(201);
                    expect(cannonModel.getLockSim()).to.equal(true);
                });
            });
        });

        describe('when model change:ballX change:ballY to the top of the target', function () {
            it('should set chippedTop to true', function () {
                cannonModel.setBallX(200);
                cannonModel.setBallY(205);
                expect(model.getChippedTop()).to.equal(true);
            });
        });

        describe('when model change:ballX change:ballY to the bottom of the target', function () {
            it('should set chippedTop to true', function () {
                model.setChippedBottom(true);
                cannonModel.setBallX(200);
                cannonModel.setBallY(195);
                expect(model.getChippedBottom()).to.equal(true);
            });
        });
    });
});
