import React from 'react';
import { shallow } from 'enzyme';

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
        const dispatch = jest.fn();
        const wrapper = shallow(
            <BlickHolder
                {...initialState}
                index={0}
                dispatch={dispatch}
                operations={<div />}
            />,
        );
        expect(wrapper.contains(<div />)).toBeTruthy();
    });
});
