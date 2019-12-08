import React, { FunctionComponent } from 'react';

import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../module/types';

const List: FunctionComponent<BrickProps> = (props) => {
    const { editable, children } = props;
    return (
        <BrickHolder {...props}>
            <ul contentEditable={editable} style={{ outline: 'none' }}>
                {children}
            </ul>
        </BrickHolder>
    );
};

export default List;
