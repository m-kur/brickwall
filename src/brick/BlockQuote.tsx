import React from 'react';

// import WallStore from '../module/WallStore';
import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../types';

function BlockQuote(props: BrickProps): JSX.Element {
    const { editable } = props;
    // const [state] = WallStore.useContainer();
    return (
        <BrickHolder {...props}>
            <blockquote contentEditable={editable} style={{ outline: 'none' }} />
        </BrickHolder>
    );
}

export default BlockQuote;
