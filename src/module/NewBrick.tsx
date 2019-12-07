import React, { ReactElement, Fragment, FunctionComponent, useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { Button, Grid } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickSegment from './BrickSegment';
import { actions } from './store';
import { BrickProps, WallDefine } from './types';

const NewBrick: FunctionComponent<BrickProps & WallDefine> = (props) => {
    const [html, setHtml] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const { editable, currentIndex, index, dispatch, brickDefines, defaultBrickType } = props;
    const focused = currentIndex === index;

    if (!editable) {
        return null;
    }

    return (
        <div onFocus={() => dispatch(actions.updateCurrent(index))}>
            <BrickSegment type="top" focused={focused} blurBorder>
                <ContentEditable
                    innerRef={ref}
                    html={html}
                    style={{ outline: 'none' }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            if (ref.current) {
                                const value = ref.current.innerHTML;
                                setHtml(value);
                                if (value) {
                                    dispatch(actions.updateData({
                                        index,
                                        data: { type: defaultBrickType, value },
                                    }));
                                    dispatch(actions.updateCurrent(index + 1));
                                    setHtml('');
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
                                        <Fragment key={key}>
                                            <Button
                                                basic
                                                icon={define.icon}
                                                disabled={!define.empty && !html}
                                                onClick={() => {
                                                    if (define.empty || html) {
                                                        dispatch(actions.updateData({
                                                            index,
                                                            data: { type, value: html },
                                                        }));
                                                        setHtml('');
                                                    }
                                                }}
                                                style={{ marginBottom: 12 }}
                                            />
                                        </Fragment>
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
