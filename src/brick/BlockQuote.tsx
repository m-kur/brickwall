import React, { FunctionComponent } from 'react';

import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../module/types';

const BlockQuote: FunctionComponent<BrickProps> = (props) => {
    const { editable, children } = props;
    return (
        <BrickHolder {...props}>
            <blockquote contentEditable={editable} style={{ outline: 'none' }}>
                {children}
            </blockquote>
        </BrickHolder>
    );
};

export default BlockQuote;
