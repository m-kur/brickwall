import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import { actions } from '../module/store';
import BrickHolder from '../module/BrickHolder';
import BrickOperations from '../module/BrickOperations';
import InlineToolbox from '../module/InlineToolbox';
import InlineTool from '../module/InlineTool';
import { BrickData, BrickProps } from '../module/types';

const Paragraph: React.FC<BrickProps> = (props) => {
    const brickData = R.nth(props.index, props.wallData) || ({} as BrickData);
    const [html, setHtml] = React.useState(brickData.value || '');

    const updateHtml = (value: string) => {
        if (html !== value) {
            setHtml(value);
            const type = brickData && brickData.type;
            props.dispatch(actions.updateData({ index: props.index, data: { type, value } }));
        }
    }
    const hasNext = props.index < R.length(props.wallData) - 1;
    return (
        <BrickHolder
            {...props}
            operations={
                <BrickOperations
                    index={props.index}
                    dispatch={props.dispatch}
                    hasNext={hasNext}
                />
            }
            options={
                <React.Fragment>
                    {/* TODO: オプションボタンの実装 */}
                    <Button basic>T+</Button>
                    <Button basic>T-</Button>
                </React.Fragment>
            }
        >
            <InlineToolbox
                tools={
                    <React.Fragment>
                        <InlineTool icon='bold' cmd='bold'/>
                        <InlineTool icon='italic' cmd='italic'/>
                        <InlineTool icon='underline' cmd='underline'/>
                        <InlineTool icon='strikethrough' cmd='strikethrough'/>
                        <InlineTool icon='edit' cmd='hiliteColor' args='Yellow'/>
                        <InlineTool icon='linkify' cmd='createLink' args='http://www.google.com'/>
                    </React.Fragment>
                }
                toolsWidth={42 * 6 + 1}
            >
                <ContentEditable
                    disabled={!props.editable}
                    html={html}
                    style={{ outline: 'none' }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            props.dispatch(actions.updateCurrent(props.index + 1));
                        }
                    }}
                    onPaste={e => {
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertHTML', false, text);
                    }}
                    onChange={e => updateHtml(e.target.value)}
                />
            </InlineToolbox>
        </BrickHolder>
    );
}

export default Paragraph;
