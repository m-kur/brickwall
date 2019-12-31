import React, { ReactElement, Fragment, FunctionComponent } from 'react';
import { Container, Grid, Responsive } from 'semantic-ui-react';

import WallStore from './WallStore';
import BrickSegment from './BrickSegment';
import BrickOperations from './BrickOperations';
import { actions, selectors } from './store';
import { BrickProps } from './types';

type BrickHolderProps = {
    options?: ReactElement;
};
const BrickHolder: FunctionComponent<BrickHolderProps & BrickProps> = (props) => {
    const { editable, id, children, options } = props;
    const [state, dispatch] = WallStore.useContainer();
    const focused = selectors.isFocused(state, props);
    const hasPrior = selectors.hasPrior(state, props);
    const hasNext = selectors.hasNext(state, props);
    const fluid = selectors.isFluid(state, props);
    return (
        <Container
            text={!fluid}
            fluid={fluid}
            onFocus={() => dispatch(actions.updateCurrent({ id, focus: false, offset: 0 }))}
            style={{ marginBottom: 5 }}
        >
            <BrickSegment type="top" focused={editable && focused}>
                {children}
            </BrickSegment>
            <BrickSegment type="bottom" focused={editable && focused}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Responsive
                                as={Fragment}
                                minWidth={Responsive.onlyTablet.minWidth}
                            >
                                <BrickOperations
                                    id={id}
                                    hasPrior={hasPrior}
                                    hasNext={hasNext}
                                    dispatch={dispatch}
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
                                id={id}
                                hasPrior={hasPrior}
                                hasNext={hasNext}
                                dispatch={dispatch}
                            />
                        </Grid.Column>
                    </Responsive>
                </Grid>
            </BrickSegment>
        </Container>
    );
};

export default BrickHolder;
