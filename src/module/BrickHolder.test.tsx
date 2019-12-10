import React from 'react';
import { shallow } from 'enzyme';

import BlickHolder from './BrickHolder';

describe('BrickHolder', () => {
    it('shallow test run', () => {
        const wrapper = shallow(
            <BlickHolder
                {...{
                    editable: true,
                    currentIndex: 0,
                    wallData: [],
                    refugedData: [],
                    index: 0,
                    type: 'paragraph',
                    meta: {},
                    value: '',
                    dispatch: jest.fn(),
                }}
            >
                <div />
            </BlickHolder>,
        );
        expect(wrapper.contains(<div />)).toBeTruthy();
    });
});
