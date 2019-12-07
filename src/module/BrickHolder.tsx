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
    const focused = editable && (currentIndex === index);

    return (
        <div onFocus={() => dispatch(actions.updateCurrent(index))} style={{ marginBottom: 5 }}>
            <BrickSegment type="top" focused={focused}>
                {children}
            </BrickSegment>
            <BrickSegment type="bottom" focused={focused}>
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
