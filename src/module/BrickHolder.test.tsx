import React from 'react';
import { shallow } from 'enzyme';

import BlickHolder from './BrickHolder';
import WallStore from './WallStore';

describe('BrickHolder', () => {
    it('shallow test run', () => {
        const wrapper = shallow(
            <WallStore.Provider>
                <BlickHolder id="" editable>
                    <div />
                </BlickHolder>
            </WallStore.Provider>,
        );
        expect(wrapper.contains(<div />)).toBeTruthy();
    });
});
