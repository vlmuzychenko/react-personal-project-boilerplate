import React from 'react';
import { shallow } from 'enzyme';
import Balance from './';

const result = shallow(<Balance />);

describe('Balance component:', () => {
    test('Should have 1 \'section\' element', () => {
        expect(result.find('section').length).toBe(1);
    });
});
