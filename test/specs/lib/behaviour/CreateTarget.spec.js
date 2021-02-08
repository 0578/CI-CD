define(function(require) {
    var sinon = require('sinon');
    var CreateTarget = require('lib/behaviour/CreateTarget');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');
    var TargetsModel = require('lib/model/Targets');

    describe('CreateTarget', function() {
        var underTest, targetsModel, targetFactory, renderer, entities, fakeEntity,
            sandbox = sinon.sandbox.create();

        beforeEach(function() {

            renderer = {
                entity: {
                    addChild: function () {
                    },
                    destroy: function () {
                    }
                }
            };

            targetFactory = {
                create: function () {
                }
            };

            targetsModel = new TargetsModel();

            entities = [];

            underTest = new CreateTarget();
            underTest.renderer = renderer;
            underTest.targetsModel = targetsModel;
            underTest.targetFactory = targetFactory;
            underTest.entities = entities;

            fakeEntity = function() {
                return {
                    destroy: sandbox.stub()
                };
            };

            sandbox.stub(underTest.targetFactory, 'create', fakeEntity);
            sandbox.stub(underTest.renderer.entity, 'addChild');
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('starting', function() {
            beforeEach(function() {
                underTest.start();
            });
            it("should fetch the number of targets from targetsModel", function() {
                expect(targetsModel.getTargets()).to.equal(0);
            });
            it("should create the number of specified targets", function() {
                expect(underTest.targetFactory.create.callCount).to.equal(0);
            });
            it("should add the target to the renderer", function() {
                expect(underTest.renderer.entity.addChild.callCount).to.equal(0);
            });
        });

        describe('when model targets changes', function() {
            beforeEach(function() {
                underTest.start();
            });
            it("should create the number of specified targets", function() {
                targetsModel.setTargets(3);
                targetsModel.setTargets(1);
                for (var i=0; i<3; i++){
                    expect(underTest.entities[i].destroy.calledOnce).to.equal(true);
                }
            });
            it("should add the target to the renderer", function() {
                underTest.targetFactory.create.reset();
                targetsModel.setTargets(3);
                expect(underTest.targetFactory.create.callCount).to.equal(3);
            });
        });
    });
});
