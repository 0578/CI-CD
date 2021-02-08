define(function(require) {
    var $ = require('jquery');
    var sinon = require('sinon');
    var UpdateBall = require('lib/behaviour/UpdateBall');
    var Model = require('lib/model/Cannon');
    var InputModel = require('componentLibrary-Utils/ExtendedBackboneModel');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');

    describe('UpdateBall Component', function() {
        var underTest, renderer, model, angleModel, velocityModel, cannonModel, aimHandle;
        var sandbox = sinon.sandbox.create();

        function initTest() {
            renderer = { $el: $('<div>') };
            renderer.parent = { $el: $('body') };

            angleModel = new InputModel({
                val: 0
            });

            velocityModel = new InputModel({
                val: 0
            });

            aimHandle = {
                reset: function(){}
            };

            model = new Model();

            underTest = new UpdateBall();
            underTest.renderer = renderer;
            underTest.angleModel = angleModel;
            underTest.velocityModel = velocityModel;
            underTest.model = model;
            underTest.aimHandle = aimHandle;
            underTest.entity = {
                destroy: function() {}
            };

            sandbox.stub(underTest.entity,'destroy');
            sandbox.stub(underTest.aimHandle,'reset');
        }

        function cleanupTest() {
            sandbox.restore();
        }

        describe('Method start', function() {
            beforeEach(initTest);
            afterEach(cleanupTest);
            it('should set ball to visible', function() {
                underTest.start();

                expect(model.getBallVisible()).to.be.true();
            });
        });

        describe('Method Update', function() {
            beforeEach(function() {
                initTest();
                underTest.start();
            });
            afterEach(cleanupTest);
            it('should increase timerCount', function() {
                underTest.update({
                    elapsed: 22
                });
                expect(underTest.timerCount).to.equal(22);
            });
            it('update the cannonModel ballX/ballY', function() {
                underTest.angleModel.setVal(90);
                underTest.velocityModel.setVal(100);
                underTest.update({
                    elapsed: 999
                });
                expect(underTest.model.getBallY()).to.be.closeTo(50,1);

                underTest.start();
                underTest.angleModel.setVal(0);
                underTest.velocityModel.setVal(100);
                underTest.update({
                    elapsed: 1000
                });
                expect(underTest.model.getBallX()).to.equal(100);
            });
            it('should destroy entity when animation ends', function() {
                underTest.velocityModel.setVal(1);
                underTest.angleModel.setVal(1);
                underTest.update({
                    elapsed: 10000
                });

                expect(underTest.model.getBallX()).to.be.above(0);
                expect(underTest.model.getBallY()).to.be.below(0);

                expect(underTest.entity.destroy.calledOnce).to.equal(true);
            });
            describe('when model lockSim is false', function() {
                it('should set cannonModel enableFireButton to true when animation ends', function() {
                    underTest.velocityModel.setVal(1);
                    underTest.angleModel.setVal(1);
                    underTest.model.setEnableFireButton(false);
                    underTest.update({
                        elapsed: 10000
                    });
                    expect(underTest.model.getEnableFireButton()).to.equal(true);
                    expect(underTest.aimHandle.reset.called).to.equal(true);
                });
            });
            describe('when model lockSim is true', function() {
                it('should leave cannonModel enableFireButton to false', function() {
                    underTest.velocityModel.setVal(1);
                    underTest.angleModel.setVal(1);
                    underTest.model.setEnableFireButton(false);
                    underTest.update({
                        elapsed: 10000
                    });
                    expect(underTest.model.getEnableFireButton()).to.equal(true);
                });
            });
            describe('when maximum bullets have been fired', function() {
               it('should not set cannonModel enableFireButton to true when animation ends ', function() {
                   it('should set cannonModel enableFireButton to true when animation ends', function() {
                       underTest.velocityModel.setVal(1);
                       underTest.angleModel.setVal(1);
                       underTest.model.setEnableFireButton(false);
                       underTest.model.setFiredBullets(99);
                       underTest.model.setMaximumBullets(99);
                       underTest.update({
                           elapsed: 10000
                       });
                       expect(underTest.model.getEnableFireButton()).to.equal(false);
                   });
               });
            });
            describe('when ball is no longer visible', function(){
                beforeEach(function() {
                    underTest.velocityModel.setVal(1);
                    underTest.angleModel.setVal(1);
                    underTest.model.setEnableFireButton(false);
                    underTest.model.setBallVisible(true);
                });
                it('should destroy entity so ball cannot hit another target', function() {
                    underTest.model.setBallVisible(false);
                    underTest.update({
                        elapsed: 22
                    });

                    expect(underTest.entity.destroy.calledOnce).to.equal(true);
                });
                describe('when model lockSim is false', function() {
                    it('should set cannonModel enableFireButton to true when animation ends', function() {
                        underTest.model.setBallVisible(false);
                        underTest.update({
                            elapsed: 22
                        });
                        expect(underTest.model.getEnableFireButton()).to.equal(true);
                    });
                });
                describe('when model lockSim is true', function() {
                    it('should leave cannonModel enableFireButton to false', function() {
                        underTest.model.setBallVisible(false);
                        underTest.update({
                            elapsed: 22
                        });
                        expect(underTest.model.getEnableFireButton()).to.equal(true);
                    });
                });
            });
        });

    });
});