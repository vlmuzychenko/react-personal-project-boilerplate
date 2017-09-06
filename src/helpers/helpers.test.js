import { getCurrentTime, getUniqueID } from './';

describe('getCurrentTime test: ', () => {
    test('getCurrentTime should be a function', () => {
        expect(typeof getCurrentTime).toBe('function');
    });

    test('getCurrentTime should return a number', () => {
        expect(typeof getCurrentTime()).toBe('number');
    });

    test('getCurrentTime output should have 10 symbols', () => {
        const testTime = getCurrentTime();

        expect(testTime.toString()).toHaveLength(10);
    });
});

describe('getUniqueID test: ', () => {
    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID should throw an error if no arguments were passed', () => {
        function getUniqueIDWithError () {
            getUniqueID(null);
        }
        expect(getUniqueIDWithError).toThrowError(
            'getUniqueID should be called with arguments'
        );
    });

    test('getUniqueID with arg 10 must return 10 symbols', () => {
        const testID = getUniqueID(10);

        expect(testID).toHaveLength(10);
    });

    test('getUniqueID should return a valid output', () => {
        expect(typeof getUniqueID()).toBe('string');
    });
});

