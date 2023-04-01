const average = require('../utils/for_testing').average;


describe('average', () => {
    
    test('of multiple values', () => { 
        expect(average([2, 3, 5, 6])).toBe(4);
    });

    test('of single values', () => {
        expect(average([2])).toBe(2);
    });

    test('of empty array', () => expect(average([])).toBe(0))

})