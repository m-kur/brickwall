import React, { FC } from 'react';

import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../module/types';

const HorizontalRule: FC<BrickProps> = (props) => (
    <BrickHolder {...props}>
        <hr contentEditable style={{ outline: 'none' }} />
    </BrickHolder>
);
export default HorizontalRule;
