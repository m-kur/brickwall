import React, { CSSProperties, FunctionComponent, RefObject, useRef } from 'react';
import ReactContentEditable from 'react-contenteditable';
import * as R from 'ramda';

type ContentEditableProps = {
    editable: boolean;
    tagName?: string;
    html: string;
    ref?: RefObject<HTMLElement>;
    style?: CSSProperties;
    onChange: (latest: string) => void;
    onKeyReturn?: (latest: string) => void;
};
const ContentEditable: FunctionComponent<ContentEditableProps> = (props) => {
    const { editable, tagName, html, ref, style, onChange, onKeyReturn } = props;
    const innerRef = ref || useRef<HTMLElement>(null);

    return (
        <ReactContentEditable
            contentEditable={editable}
            html={html}
            innerRef={innerRef}
            style={R.mergeDeepRight((style || {}), { outline: 'none' })}
            tagName={tagName}
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    if (innerRef.current && onKeyReturn) {
                        const { innerHTML } = innerRef.current;
                        onKeyReturn(innerHTML);
                    }
                }
            }}
            onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain');
                document.execCommand('insertHTML', false, text);
            }}
            onChange={(e) => {
                const { value } = e.target;
                onChange(value);
            }}
        />
    );
};

export default ContentEditable;
