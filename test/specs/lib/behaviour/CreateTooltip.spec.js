define(function(require){
    var $ = require('jquery');
    var sinon = require('sinon');
    var CreateTooltip = require('lib/behaviour/CreateTooltip');
    var Model = require('lib/model/Target');
    var TargetsModel = require('lib/model/Targets');

    describe('Create Tooltip', function(){
        var underTest, renderer, model, targetsModel, tooltipCreator;

        beforeEach(function(){
            renderer = {
                $el: $('<div></div>')
            };

            model = new Model();

            targetsModel = new TargetsModel();

            tooltipCreator = {
                create: sinon.stub(),
                destroyLast: sinon.stub()
            };

            underTest = new CreateTooltip();
            underTest.renderer = renderer;
            underTest.model = model;
            underTest.targetsModel = targetsModel;
            underTest.tooltipCreator = tooltipCreator;

            underTest.start();
        });

        describe('when clicked', function(){
            it('should create the tooltip', function(){
                renderer.$el.click();

                expect(tooltipCreator.create.called).to.equal(true);
                expect(model.getShowTooltip()).to.equal(true);
            });

            it('should not create the tooltip if targetsModel.allowTargetTooltips is false', function(){
                targetsModel.setAllowTargetTooltips(false);

                renderer.$el.click();

                expect(tooltipCreator.create.called).to.equal(false);
                expect(model.getShowTooltip()).to.equal(false);
            });

            it('should destroy the tooltip if it is already shown', function(){
                model.setShowTooltip(true);

                renderer.$el.click();

                expect(tooltipCreator.destroyLast.called).to.equal(true);
            });
        });


    });

});