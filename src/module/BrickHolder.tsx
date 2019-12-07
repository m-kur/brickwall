import React, { ReactElement, Fragment, FC } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickSegment from './BrickSegment';
import BrickOperations from './BrickOperations';
import { actions } from './store';
import { BrickProps } from './types';

type BrickHolderProps = {
    options?: ReactElement;
};
const BrickHolder: FC<BrickHolderProps & BrickProps> = (props) => {
    const { editable, currentIndex, index, wallData, dispatch, children, options } = props;
    const focused = editable && (currentIndex === index);
    const hasNext = index < R.length(wallData) - 1;

    return (
        <div
            onFocus={() => dispatch(actions.updateCurrent(index))}
            style={{ marginBottom: 5 }}
        >
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
                                <BrickOperations
                                    index={index}
                                    dispatch={dispatch}
                                    hasNext={hasNext}
                                />
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
                            <BrickOperations
                                index={index}
                                dispatch={dispatch}
                                hasNext={hasNext}
                            />
                        </Grid.Column>
                    </Responsive>
                </Grid>
            </BrickSegment>
        </div>
    );
};

export default BrickHolder;
