import React from 'react';
import { Grid, Responsive } from 'semantic-ui-react';

import BrickSegment from './BrickSegment';
import { actions } from './store';
import { BrickState, WallState } from './types';

type BrickHolderProps = {
    operations: React.ReactElement;
    options?: React.ReactElement;
};
const BrickHolder: React.FC<BrickHolderProps & BrickState & WallState> = (props) => {
    const drawOutline = props.editable && (props.currentIndex === props.index);
    return (
        <div onFocus={() => props.dispatch(actions.updateCurrent(props.index))}>
            <BrickSegment type='top' drawOutline={drawOutline}>
                {props.children}
            </BrickSegment>
            <BrickSegment type='bottom' drawOutline={drawOutline}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Responsive
                                as={React.Fragment}
                                minWidth={Responsive.onlyTablet.minWidth}
                            >
                                {props.operations}
                            </Responsive>
                            {props.options}
                        </Grid.Column>
                    </Grid.Row>
                    <Responsive
                        as={Grid.Row}
                        maxWidth={Responsive.onlyMobile.maxWidth}
                        style={{ paddingTop: 0 }}
                    >
                        <Grid.Column>
                            {props.operations}
                        </Grid.Column>
                    </Responsive>
                </Grid>
            </BrickSegment>
        </div>
    );
}

export default BrickHolder;
