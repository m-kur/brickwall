import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Button, Grid } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickSegment from './BrickSegment';
import { actions } from './store';
import { BrickProps, WallDefine } from './types';

const NewBrick: React.FC<BrickProps & WallDefine> = (props) => {
    const [html, setHtml] = React.useState<string|undefined>('');
    const ref = React.useRef<HTMLDivElement>(null);
    const { editable, currentIndex, index, brickDefines } = props;

    if (!editable) {
        return null;
    }

    const update = (type: string): void => {
        const el = ref.current;
        if (el) {
            props.dispatch(actions.updateData({
                index: props.index,
                data: { type, value: el.innerHTML },
            }));
            setHtml('');
        }
    };

    const drawOutline = editable && (currentIndex === index);
    return (
        <div
            onFocus={() => props.dispatch(actions.updateCurrent(props.index))}
            onBlur={() => {
                if (html) {
                    update(props.defaultBrickType);
                }
            }}
        >
            <BrickSegment type="top" drawOutline={drawOutline}>
                <ContentEditable
                    innerRef={ref}
                    html={html || ''}
                    style={{ outline: 'none' }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            update(props.defaultBrickType);
                            props.dispatch(actions.updateCurrent(props.index + 1));
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
            <BrickSegment type="bottom" drawOutline={drawOutline}>
                <Grid>
                    <Grid.Row style={{ paddingBottom: 0 }}>
                        <Grid.Column width={13}>
                            {R.addIndex<string, React.ReactElement>(R.map)(
                                (name, key) => {
                                    const define = R.prop(name, props.brickDefines);
                                    return (
                                        <React.Fragment key={key}>
                                            <Button
                                                basic
                                                icon={define.icon}
                                                onClick={() => update(name)}
                                                style={{ marginBottom: 12 }}
                                            />
                                        </React.Fragment>
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
