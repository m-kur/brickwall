import React, { ReactElement, Fragment, FC } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';

import BrickSegment from './BrickSegment';
import { actions } from './store';
import { BrickState, WallState } from './types';

type BrickHolderProps = {
    operations: ReactElement;
    options?: ReactElement;
};
const BrickHolder: FC<BrickHolderProps & BrickState & WallState> = (props) => {
    const { editable, currentIndex, index, dispatch, children, operations, options } = props;
    const drawOutline = editable && (currentIndex === index);
    return (
        <div onFocus={() => dispatch(actions.updateCurrent(index))}>
            <BrickSegment type="top" drawOutline={drawOutline}>
                {children}
            </BrickSegment>
            <BrickSegment type="bottom" drawOutline={drawOutline}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Responsive
                                as={Fragment}
                                minWidth={Responsive.onlyTablet.minWidth}
                            >
                                {operations}
                            </Responsive>
                            {options}
                        </Grid.Column>
                    </Grid.Row>
                    <Responsive
                        as={Grid.Row}
                        maxWidth={Responsive.onlyMobile.maxWidth}
                        style={{ paddingTop: 0 }}
                    >
                        <Grid.Column>
                            {operations}
                        </Grid.Column>
                    </Responsive>
                </Grid>
            </BrickSegment>
        </div>
    );
};

export default BrickHolder;
