import React from 'react';
import { Segment } from 'semantic-ui-react';

type BrickSegmentProps = {
    type: 'top'|'bottom';
    drawOutline: boolean;
};

const BrickSegment: React.FC<BrickSegmentProps> = (props) => {
    const { type, drawOutline, children } = props;
    if (!drawOutline && type === 'bottom') {
        return null;
    }

    const attached = drawOutline ? type : undefined;
    const style = { margin: drawOutline ? 0 : 1 };
    return (
        <Segment basic={!drawOutline} attached={attached} style={style}>
            {children}
        </Segment>
    );
};

export default BrickSegment;
