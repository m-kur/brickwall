import React, { ReactElement, FunctionComponent, useState, useRef } from 'react';
import { Container, Button, Grid } from 'semantic-ui-react';
import * as R from 'ramda';

import WallStore, { useAdjustFocus } from './WallStore';
import BrickSegment from './BrickSegment';
import ContentEditable from './ContentEditable';
import { actions } from './store';
import { WallProps } from './types';

const NewBrick: FunctionComponent<WallProps> = (props) => {
    const { editable, brickDefines, defaultBrickType } = props;
    const [state, dispatch] = WallStore.useContainer();
    const [html, setHtml] = useState('');
    const focused = state.currentBrick === '';
    const el = useRef<HTMLElement>(null);
    useAdjustFocus('', el);

    if (!editable) {
        return null;
    }

    const createBrick = (type: string, value: string) => {
        const define = R.prop(type, brickDefines);
        if (define && (define.empty || value)) {
            dispatch(actions.updateData({ id: '', type, meta: {}, value }));
            dispatch(actions.updateCurrent({ id: '', focus: true, offset: -1 }));
            setHtml('');
        }
    };

    return (
        <Container text onFocus={() => dispatch(actions.updateCurrent({ id: '', focus: false, offset: 0 }))}>
            <BrickSegment type="top" focused={focused} blurBorder>
                <ContentEditable
                    tagName="p"
                    editable={focused}
                    html={html}
                    el={el}
                    style={{ fontSize: 'medium' }}
                    onChange={(latest) => setHtml(latest)}
                    onKeyLastReturn={(latest) => createBrick(defaultBrickType, latest)}
                    onKeyFirstDelete={() => dispatch(actions.updateCurrent({ id: '', focus: true, offset: -1 }))}
                />
            </BrickSegment>
            <BrickSegment type="bottom" focused={focused}>
                <Grid>
                    <Grid.Row style={{ paddingBottom: 0 }}>
                        <Grid.Column width={13}>
                            {R.addIndex<string, ReactElement>(R.map)(
                                (type, i) => {
                                    const define = R.prop(type, brickDefines);
                                    return (
                                        <Button
                                            key={i}
                                            basic
                                            icon={define.icon}
                                            disabled={!define.empty && !html}
                                            onClick={() => createBrick(type, html)}
                                            style={{ marginBottom: 12 }}
                                        />
                                    );
                                },
                                R.keys(brickDefines),
                            )}
                        </Grid.Column>
                        <Grid.Column width={3} verticalAlign="bottom">
                            <Button
                                icon="reply"
                                floated="right"
                                style={{ marginBottom: 12 }}
                                tabIndex={-1}
                                onClick={() => { /* TODO 実装 */ }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </BrickSegment>
        </Container>
    );
};

export default NewBrick;
