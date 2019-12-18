import React, { ReactElement, Fragment, FunctionComponent } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';

import WallStore from './WallStore';
import BrickSegment from './BrickSegment';
import BrickOperations from './BrickOperations';
import { actions, selectors } from './store';
import { BrickProps } from './types';

type BrickHolderProps = {
    options?: ReactElement;
};
const BrickHolder: FunctionComponent<BrickHolderProps & BrickProps> = (props) => {
    const { index, children, options } = props;
    const [state, dispatch] = WallStore.useContainer();
    const focused = selectors.isFocused(state, props);
    const hasNext = index < selectors.getDataLength(state) - 1;
    return (
        <div
            onFocus={() => dispatch(actions.updateCurrent({ index, focus: false }))}
            style={{ marginBottom: 5 }}
        >
            <BrickSegment type="top" focused={state.editable && focused}>
                {children}
            </BrickSegment>
            <BrickSegment type="bottom" focused={state.editable && focused}>
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
