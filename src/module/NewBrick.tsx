import React, { ReactElement, FunctionComponent, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickSegment from './BrickSegment';
import ContentEditable from './ContentEditable';
import { actions } from './store';
import { BrickProps, WallDefine } from './types';

const NewBrick: FunctionComponent<BrickProps & WallDefine> = (props) => {
    const {
        editable, currentIndex, index, value, dispatch,
        brickDefines, defaultBrickType,
    } = props;
    const [html, setHtml] = useState(value);
    const focused = currentIndex === index;

    if (!editable) {
        return null;
    }

    const createBrick = (type: string, v: string) => {
        dispatch(actions.updateData({
            index,
            data: { type, value: v },
        }));
        setHtml('');
    };

    return (
        <div onFocus={() => dispatch(actions.updateCurrent(index))}>
            <BrickSegment type="top" focused={focused} blurBorder>
                <ContentEditable
                    editable={focused}
                    html={html}
                    onKeyReturn={(latest) => {
                        createBrick(defaultBrickType, latest);
                        dispatch(actions.updateCurrent(index + 1));
                    }}
                    onChange={(latest) => setHtml(latest)}
                />
            </BrickSegment>
            <BrickSegment type="bottom" focused={focused}>
                <Grid>
                    <Grid.Row style={{ paddingBottom: 0 }}>
                        <Grid.Column width={13}>
                            {R.addIndex<string, ReactElement>(R.map)(
                                (type, key) => {
                                    const define = R.prop(type, brickDefines);
                                    return (
                                        <Button
                                            key={key}
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
