import React from 'react';
import { Segment } from 'semantic-ui-react';

type BrickSegmentProps = {
    type: 'top'|'bottom';
    drawOutline: boolean;
};

const BrickSegment: React.FC<BrickSegmentProps> = (props) => {
    if (!props.drawOutline && props.type === 'bottom') {
        return null;
    }

    const attached = props.drawOutline ? props.type : undefined;
    const style = { margin: props.drawOutline ? 0 : 1 };
    return (
        <Segment basic={!props.drawOutline} attached={attached} style={style}>
            {props.children}
        </Segment>
    );
}

export default BrickSegment;
