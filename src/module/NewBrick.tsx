import React, { ReactElement, FunctionComponent, useState, useRef } from 'react';
import ReactContentEditable from 'react-contenteditable';
import { Button, Grid } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickSegment from './BrickSegment';
import { actions } from './store';
import { BrickProps, WallDefine } from './types';

const NewBrick: FunctionComponent<BrickProps & WallDefine> = (props) => {
    const {
        editable, currentIndex, index, value, dispatch,
        brickDefines, defaultBrickType,
    } = props;
    const [html, setHtml] = useState(value);
    const ref = useRef<HTMLDivElement>(null);
    const focused = currentIndex === index;

    if (!editable) {
        return null;
    }

    const createBrick = (type: string, state: string) => {
        dispatch(actions.updateData({
            index,
            data: { type, value: state },
        }));
        setHtml('');
    };

    return (
        <div onFocus={() => dispatch(actions.updateCurrent(index))}>
            <BrickSegment type="top" focused={focused} blurBorder>
                <ReactContentEditable
                    innerRef={ref}
                    html={html}
                    style={{ outline: 'none' }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            if (ref.current) {
                                const { innerHTML } = ref.current;
                                if (innerHTML) {
                                    createBrick(defaultBrickType, innerHTML);
                                    dispatch(actions.updateCurrent(index + 1));
                                }
                            }
                        }
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertHTML', false, text);
                    }}
                    onChange={(e) => setHtml(e.target.value)}
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
                                            onClick={() => {
                                                if (define.empty || html) {
                                                    createBrick(type, html);
                                                }
                                            }}
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
