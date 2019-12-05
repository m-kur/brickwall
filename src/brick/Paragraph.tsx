import React, { FC, Fragment, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import { actions } from '../module/store';
import BrickHolder from '../module/BrickHolder';
import BrickOperations from '../module/BrickOperations';
import InlineToolbox from '../module/InlineToolbox';
import InlineTool from '../module/InlineTool';
import { BrickData, BrickProps } from '../module/types';

const Paragraph: FC<BrickProps> = (props) => {
    const { editable, index, wallData, dispatch } = props;
    const brickData = R.nth(index, wallData) || ({} as BrickData);
    const [html, setHtml] = useState(brickData.value || '');

    const updateHtml = (value: string): void => {
        if (html !== value) {
            setHtml(value);
            const type = brickData && brickData.type;
            dispatch(actions.updateData({ index, data: { type, value } }));
        }
    };
    const hasNext = index < R.length(wallData) - 1;
    return (
        <BrickHolder
            {...props}
            operations={(
                <BrickOperations
                    index={index}
                    dispatch={dispatch}
                    hasNext={hasNext}
                />
            )}
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
                        <InlineTool icon="bold" cmd="bold" />
                        <InlineTool icon="italic" cmd="italic" />
                        <InlineTool icon="underline" cmd="underline" />
                        <InlineTool icon="strikethrough" cmd="strikethrough" />
                        <InlineTool icon="edit" cmd="hiliteColor" args="Yellow" />
                        {/* TODO: Link先URLを指定する方法の実装 */}
                        <InlineTool icon="linkify" cmd="createLink" args="http://www.google.com" />
                    </Fragment>
                )}
                toolsWidth={42 * 6 + 1}
            >
                <ContentEditable
                    disabled={!editable}
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
