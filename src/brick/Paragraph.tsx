import React, { FunctionComponent, Fragment, useRef } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import WallStore, { useAdjustFocus } from '../module/WallStore';
import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import InlineToolbox from '../module/InlineToolbox';
import { actions, selectors } from '../module/store';
import { BrickProps } from '../types';
import createSimpleTool from '../tool/createSimpleTool';
import marker from '../tool/marker';
import linkify from '../tool/linkify';

const fontSizeValue = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

const Paragraph: FunctionComponent<BrickProps> = (props) => {
    const { editable } = props;
    const [state, dispatch] = WallStore.useContainer();
    const { id, type, meta, value } = selectors.getBrickData(state, props);
    const focused = selectors.isFocused(state, props);
    const el = useRef<HTMLElement>(null);
    useAdjustFocus(id, el);

    const setFontSize = (size: number) => dispatch(actions.updateData({
        id, type, meta: { fontSize: size }, value,
    }));

    let fontSize = R.prop('fontSize', meta) as number;
    if (fontSize === undefined) {
        fontSize = 2;
    }

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
                editable={editable}
                focused={focused}
                toolDefines={{
                    bold: createSimpleTool('bold', 'bold'),
                    italic: createSimpleTool('italic', 'italic'),
                    underline: createSimpleTool('underline', 'underline'),
                    strikethrough: createSimpleTool('strikethrough', 'strikethrough'),
                    marker,
                    linkify,
                }}
            >
                <ContentEditable
                    tagName="p"
                    editable={editable && focused}
                    html={value}
                    el={el}
                    style={{ fontSize: fontSizeValue[fontSize] }}
                    onChange={(latest) => {
                        dispatch(actions.updateData({
                            id, type, meta: { fontSize }, value: latest,
                        }));
                    }}
                    onKeyLastReturn={() => {
                        dispatch(actions.updateCurrent({ id, focus: true, offset: 1 }));
                    }}
                />
            </InlineToolbox>
        </BrickHolder>
    );
};

export default Paragraph;
