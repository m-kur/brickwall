import React from 'react';
import { shallow } from 'enzyme';

import BlickHolder from './BrickHolder';

describe('BrickHolder', () => {
    it('shallow test run', () => {
        const wrapper = shallow(
            <BlickHolder
                {...{
                    editable: true,
                    focused: true,
                    hasNext: true,
                    index: 0,
                    dispatch: jest.fn(),
                    id: '',
                    key: '',
                    type: 'paragraph',
                    meta: {},
                    value: '',
                }}
            >
                <div />
            </BlickHolder>,
        );
        expect(wrapper.contains(<div />)).toBeTruthy();
    });
});
