import React, { FunctionComponent, Fragment, useState } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import InlineToolbox from '../module/InlineToolbox';
import CommandTool from '../module/CommandTool';
import { actions } from '../module/store';
import { BrickProps } from '../module/types';

const fontSizeValue = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

const Paragraph: FunctionComponent<BrickProps> = (props) => {
    const { editable, currentIndex, index, type, meta, value, dispatch } = props;
    const focused = currentIndex === index;
    const [fontSize, setFontSize] = useState((R.prop('fontSize', meta) || 2) as number);

    return (
        <BrickHolder
            {...props}
            options={(
                <Fragment>
                    <Button
                        basic
                        disabled={fontSize <= 0}
                        onClick={() => setFontSize(fontSize - 1)}
                    >
                        T-
                    </Button>
                    <Button
                        basic
                        disabled={fontSize >= 5}
                        onClick={() => setFontSize(fontSize + 1)}
                    >
                        T+
                    </Button>
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
                    style={{ fontSize: fontSizeValue[fontSize] }}
                    onChange={(latest) => {
                        dispatch(actions.updateData({
                            index,
                            data: { type, meta: { fontSize }, value: latest },
                        }));
                    }}
                />
            </InlineToolbox>
        </BrickHolder>
    );
};

export default Paragraph;
