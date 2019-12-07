import React, { FunctionComponent, Fragment, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import { actions } from '../module/store';
import BrickHolder from '../module/BrickHolder';
import InlineToolbox from '../module/InlineToolbox';
import CommandTool from '../module/CommandTool';
import { BrickData, BrickProps } from '../module/types';

const Paragraph: FunctionComponent<BrickProps> = (props) => {
    const { editable, currentIndex, index, wallData, dispatch } = props;
    const brickData = R.nth(index, wallData) || ({} as BrickData);
    const [html, setHtml] = useState(brickData.value || '');
    const focused = currentIndex === index;

    const updateHtml = (value: string) => {
        if (html !== value) {
            setHtml(value);
            const type = brickData && brickData.type;
            dispatch(actions.updateData({ index, data: { type, value } }));
        }
    };

    return (
        <BrickHolder
            {...props}
            options={(
                <Fragment>
                    {/* TODO: オプションボタンの実装 */}
                    <Button basic>T+</Button>
                    <Button basic>T-</Button>
                </Fragment>
            )}
        >
            <InlineToolbox
                tools={(
                    <Fragment>
                        <CommandTool icon="bold" cmd="bold" />
                        <CommandTool icon="italic" cmd="italic" />
                        <CommandTool icon="underline" cmd="underline" />
                        <CommandTool icon="strikethrough" cmd="strikethrough" />
                        <CommandTool icon="edit" cmd="hiliteColor" args="Yellow" />
                        {/* TODO: Link先URLを指定する方法の実装 */}
                        <CommandTool icon="linkify" cmd="createLink" args="http://www.google.com" />
                    </Fragment>
                )}
                toolsWidth={42 * 6 + 1}
            >
                <ContentEditable
                    contentEditable={editable && focused}
                    html={html}
                    style={{ outline: 'none' }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            dispatch(actions.updateCurrent(index + 1));
                        }
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertHTML', false, text);
                    }}
                    onChange={(e) => updateHtml(e.target.value)}
                />
            </InlineToolbox>
        </BrickHolder>
    );
};

export default Paragraph;
