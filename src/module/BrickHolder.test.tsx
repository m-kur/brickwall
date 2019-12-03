import React from 'react';
import enzyme, { shallow } from 'enzyme';

import BlickHolder from './BrickHolder';
import { WallState } from './types';

const initialState: WallState = {
    editable: true,
    currentIndex: 0,
    wallData: [{
        type: 'header',
        value: 'first',
    }],
    refugedData: [],
};

describe('BrickHolder', () => {
    it('shallow test run', () => {
/*
        const dispatch = jest.fn();
        const wrapper = shallow(
            <BlickHolder
                index={0}
                state={initialState}
                dispatch={dispatch}
            />
        );
        expect(wrapper.contains(<h1>first</h1>)).toBeTruthy();
*/
    })
});
