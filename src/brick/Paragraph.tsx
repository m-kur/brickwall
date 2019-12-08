import React, { FunctionComponent, Fragment } from 'react';
import { Button } from 'semantic-ui-react';

import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import InlineToolbox from '../module/InlineToolbox';
import CommandTool from '../module/CommandTool';
import { actions } from '../module/store';
import { BrickProps } from '../module/types';

const Paragraph: FunctionComponent<BrickProps> = (props) => {
    const { editable, currentIndex, index, type, value, dispatch } = props;
    const focused = currentIndex === index;

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
                    editable={editable && focused}
                    html={value}
                    onDispatch={(state) => {
                        dispatch(actions.updateData({
                            index,
                            data: { type, value: state },
                        }));
                    }}
                />
            </InlineToolbox>
        </BrickHolder>
    );
};

export default Paragraph;
