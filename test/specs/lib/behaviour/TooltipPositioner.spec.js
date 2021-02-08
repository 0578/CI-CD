define(function(require){

    var $ = require('jquery');
    var sinon = require('sinon');
    var TooltipPositioner = require('lib/behaviour/TooltipPositioner');


    describe('Tooltip Positioner', function(){

        var underTest, renderer, target;

        beforeEach(function(){

            target = {
                x: 0,
                y:0
            };

            renderer = {
                x: 0,
                y: 0,
                $el: $('<div></div>')
            };

            sinon.stub(renderer.$el, "toggleClass");

            underTest = new TooltipPositioner();
            underTest.renderer = renderer;
            underTest.target = target;
        });

        describe('start', function(){

            it('should set the position of the renderer', function(){
                target.x = 200;
                target.y = -100;

                underTest.start();

                expect(renderer.x).to.equal(200);
                expect(renderer.y).to.equal(-100);
            });
        });

        describe('update', function(){

            it('should set the position of the renderer', function(){
                underTest.start();

                target.x = 200;
                target.y = -100;

                underTest.update();
                expect(renderer.x).to.equal(200);
                expect(renderer.y).to.equal(-100);
            });

            it('should set the right class if x is less than 198', function(){
                underTest.start();

                target.x = 197;
                target.y = -100;

                underTest.update();
                expect(renderer.$el.toggleClass.getCall(1).args[1]).to.equal(true);
            });

            it('should not update if the position has not changed', function(){
                underTest.start();

                target.x = 197;
                target.y = -100;

                underTest.update();
                underTest.update();

                expect(renderer.$el.toggleClass.callCount).to.equal(2);
            });

        });

    });

});