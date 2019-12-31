import React, { FunctionComponent } from 'react';

// import WallStore from '../module/WallStore';
import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../module/types';

const HorizontalRule: FunctionComponent<BrickProps> = (props) => {
    const { editable } = props;
    // const [state] = WallStore.useContainer();
    return (
        <BrickHolder {...props}>
            <hr contentEditable={editable} style={{ outline: 'none' }} />
        </BrickHolder>
    );
};

export default HorizontalRule;
