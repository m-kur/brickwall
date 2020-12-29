import React, { PropsWithChildren } from 'react';
import { Segment } from 'semantic-ui-react';

type BrickSegmentProps = {
    type: 'top'|'bottom';
    focused: boolean;
    blurBorder?: boolean;
};
function BrickSegment(props: PropsWithChildren<BrickSegmentProps>): JSX.Element {
    const { type, focused, blurBorder, children } = props;

    if (!focused && type === 'bottom') {
        return <></>;
    }

    const drawOutline = focused || blurBorder;
    const basic = !drawOutline;
    const attached = drawOutline ? type : undefined;
    let style = { margin: drawOutline ? 0 : 1 };
    if (!focused && blurBorder) {
        style = { ...style, ...{ borderRadius: 4 } };
    }

    return (
        <Segment basic={basic} attached={attached} style={style}>
            {children}
        </Segment>
    );
}

export default BrickSegment;
