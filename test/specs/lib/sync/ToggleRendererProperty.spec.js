define(function(require){

    var ToggleRendererProperty = require('lib/sync/ToggleRendererProperty');
    var Model = require('lib/model/InputValue');
    var CannonModel = require('lib/model/Cannon');
    var HtmlRenderer = require('componentLibrary-Renderers/HtmlRenderer');
    var $ = require('jquery');

    describe('ToggleRendererProperty component',function(){
       var underTest, model, cannonModel, renderer;
        var $body = $('body');

        beforeEach(function(){

            renderer = new HtmlRenderer();
            renderer.initialize();
            $body.append(renderer.$el);

            model = new Model({allowEdit:false});
            cannonModel = new CannonModel({lockSim: true});

            underTest = new ToggleRendererProperty();
            underTest.models = [model,cannonModel];
            underTest.modelKeys = ['allowEdit','lockSim'];
            underTest.renderer = renderer;
            underTest.modelKeyValues = [false,true];
            underTest.propertyName = 'disabled';
        });

        afterEach(function(){
            renderer.destroy();
            underTest.destroy();
        });


        describe('start',function(){
            describe('when all the modelKeys are the same as the the modelKeyValues',function(){
                it('should add the property to the renderer',function(){
                    model.setValue('allowEdit', false);
                    cannonModel.setValue('lockSim', true);
                    underTest.start();
                    expect(renderer.$el.prop('disabled')).to.equal(true);
                });
            });
            describe('when one of the modelKeys are the same as the the modelKeyValue',function(){
               it('should add the property to the renderer',function(){
                   model.setValue('allowEdit', true);
                   cannonModel.setValue('lockSim', true);
                   underTest.start();
                   expect(renderer.$el.prop('disabled')).to.equal(true);
               });
            });
            describe('when none of the modelKeys are the same as the the modelKeyValue',function(){
                it('should NOT add the property to the renderer',function(){
                    model.setValue('allowEdit', true);
                    cannonModel.setValue('lockSim', false);
                    underTest.start();
                    expect(renderer.$el.prop('disabled')).to.equal(false);
                });
            });
        });

        describe('when one of the modelKeys are changed in the model',function(){
            describe('when all the modelKeys are the same as the the modelKeyValues',function(){
                it('should add the property to the renderer',function(){
                    model.setValue('allowEdit', false);
                    cannonModel.setValue('lockSim', false);
                    underTest.start();
                    renderer.$el.prop('disabled',false);
                    cannonModel.setValue('lockSim', true);
                    expect(renderer.$el.prop('disabled')).to.equal(true);
                });
            });
            describe('when one of the modelKeys are the same as the the modelKeyValue',function(){
                it('should add the property to the renderer',function(){
                    model.setValue('allowEdit', true);
                    cannonModel.setValue('lockSim', false);
                    underTest.start();
                    renderer.$el.prop('disabled',false);
                    cannonModel.setValue('lockSim', true);
                    expect(renderer.$el.prop('disabled')).to.equal(true);
                });
            });
            describe('when none of the modelKeys are the same as the the modelKeyValue',function(){
                it('should NOT add the property to the renderer',function(){
                    model.setValue('allowEdit', true);
                    cannonModel.setValue('lockSim', true);
                    underTest.start();
                    renderer.$el.prop('disabled',true);
                    cannonModel.setValue('lockSim', false);
                    expect(renderer.$el.prop('disabled')).to.equal(false);
                });
            });
        });
    });
});
