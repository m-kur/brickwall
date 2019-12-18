import React, { ReactElement, FunctionComponent, useState, useRef } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import * as R from 'ramda';

import WallStore, { useAdjestFocus } from './WallStore';
import BrickSegment from './BrickSegment';
import ContentEditable from './ContentEditable';
import { actions, selectors } from './store';
import { BrickProps, WallDefine } from './types';

const NewBrick: FunctionComponent<BrickProps & WallDefine> = (props) => {
    const { index, brickDefines, defaultBrickType } = props;
    const [state, dispatch] = WallStore.useContainer();
    const [html, setHtml] = useState('');
    const focused = selectors.isFocused(state, props);
    const el = useRef<HTMLElement>(null);
    useAdjestFocus(index, el);

    if (!state.editable) {
        return null;
    }

    const createBrick = (type: string, value: string, nextFocusIndex: number) => {
        dispatch(actions.updateData({
            index,
            data: {
                id: '',
                type,
                meta: {},
                value,
            },
        }));
        dispatch(actions.updateCurrent({ index: nextFocusIndex, focus: true }));
        setHtml('');
    };

    return (
        <div onFocus={() => dispatch(actions.updateCurrent({ index, focus: false }))}>
            <BrickSegment type="top" focused={focused} blurBorder>
                <ContentEditable
                    editable={focused}
                    html={html}
                    el={el}
                    onKeyReturn={(latest) => createBrick(defaultBrickType, latest, index + 1)}
                    onChange={(latest) => setHtml(latest)}
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
                                            onClick={() => createBrick(type, html, index)}
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
        </div>
    );
};

export default NewBrick;
