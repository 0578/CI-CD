define(function(require){
    var NumberValidator = require('lib/validator/Number');

    describe('Number validation', function() {
        var underTest;

        beforeEach(function() {
            underTest = new NumberValidator();
        });

        describe('when a number is passed', function() {
            it('should return the same number', function() {
                expect(underTest.validate(11)).to.equal(11);
            });
        });

        describe('when a string which contains just characters is passed', function() {
            it('should return 0', function() {
                expect(underTest.validate('abc')).to.equal(0);
            });
        });

        describe('when a string which contains both numbers and characters is passed', function() {
            describe('when the string contains characters after numbers',function(){
                it('should return the numbers before characters', function() {
                    expect(underTest.validate('22abc')).to.equal(22);
                });
            });

            describe('when the string contains numbers after characters',function(){
                it('should return 0', function() {
                    expect(function(){ underTest.validate('abc23').to.equal(0); });
                });
            });
        });
    });
});