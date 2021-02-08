define(function(require){
    var $ = require("jquery");
    var sinon = require('sinon');
    var TooltipCreator = require('lib/behaviour/TooltipCreator');


    describe("Tooltip Creator", function(){
        var underTest, factory, container, model;

        beforeEach(function(){

            factory = {
                create: function(){
                    var entity = {
                        destroyed: false,
                        destroy: sinon.stub()
                    };

                    return entity;
                }
            };

            model = {
                setShowTooltip: sinon.stub()
            };

            container = {
                $el: $('<div></div>')
            };

            underTest = new TooltipCreator();
            underTest.factory = factory;
            underTest.container = container;

        });

        describe('when create is called', function(){

            it('should create a tooltip', function(){
                underTest.create({model:model});

                expect(underTest.lastEntityCreated).to.not.equal(null);
            });

            it('should destroy the previous tooltip', function(){
                underTest.create({model:model});
                underTest.create({model:model});

                expect(model.setShowTooltip.getCall(0).args[0]).to.equal(false);
            });

        });

        describe("when the container is clicked", function(){
            it('should destroy the last Entity that was created', function(){
                underTest.start();

                underTest.create({model:model});

                container.$el.click();

                expect(model.setShowTooltip.getCall(0).args[0]).to.equal(false);
                expect(underTest.lastEntityCreated.destroy.called).to.equal(true);
            });
        });

    });

});