import React, { FC } from 'react';
import { Segment } from 'semantic-ui-react';
import * as R from 'ramda';

type BrickSegmentProps = {
    type: 'top'|'bottom';
    focused: boolean;
    blurBorder?: boolean;
};

const BrickSegment: FC<BrickSegmentProps> = (props) => {
    const { type, focused, blurBorder, children } = props;

    if (!focused && type === 'bottom') {
        return null;
    }

    const drawOutline = focused || blurBorder;
    const basic = !drawOutline;
    const attached = drawOutline ? type : undefined;
    let style = { margin: drawOutline ? 0 : 1 };
    if (!focused && blurBorder) {
        style = R.mergeRight(style, { borderRadius: 4 });
    }

    return (
        <Segment basic={basic} attached={attached} style={style}>
            {children}
        </Segment>
    );
};

export default BrickSegment;
