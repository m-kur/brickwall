import React, { FunctionComponent } from 'react';

import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../module/types';

const HorizontalRule: FunctionComponent<BrickProps> = (props) => {
    const { editable } = props;
    return (
        <BrickHolder {...props}>
            <hr contentEditable={editable} style={{ outline: 'none' }} />
        </BrickHolder>
    );
};

export default HorizontalRule;
