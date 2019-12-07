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
                    wallData: [{
                        type: 'paragraph',
                        value: '',
                    }],
                    refugedData: [],
                    index: 0,
                    dispatch: jest.fn(),
                }}
            />,
        );
        expect(wrapper.contains(<div />)).toBeTruthy();
    });
});
