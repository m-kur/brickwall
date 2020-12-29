import React from 'react';

// import WallStore from '../module/WallStore';
import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../types';

function HorizontalRule(props: BrickProps): JSX.Element {
    const { editable } = props;
    // const [state] = WallStore.useContainer();
    return (
        <BrickHolder {...props}>
            <hr contentEditable={editable} style={{ outline: 'none' }} />
        </BrickHolder>
    );
}

export default HorizontalRule;
