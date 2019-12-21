import React, { CSSProperties, FunctionComponent, RefObject, useRef } from 'react';
import ReactContentEditable from 'react-contenteditable';
import * as R from 'ramda';

type ContentEditableProps = {
    editable: boolean;
    tagName?: string;
    html: string;
    el?: RefObject<HTMLElement>;
    style?: CSSProperties;
    onChange: (latest: string) => void;
    onKeyReturn?: (latest: string) => void;
    onKeyLastDelete?: () => void;
};
const ContentEditable: FunctionComponent<ContentEditableProps> = (props) => {
    const { editable, tagName, html, el, style, onChange, onKeyReturn, onKeyLastDelete } = props;
    const innerRef = el || useRef<HTMLElement>(null);

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
                if (e.keyCode === 8 || e.keyCode === 46) {
                    if (innerRef.current && !innerRef.current.innerHTML && onKeyLastDelete) {
                        e.preventDefault();
                        onKeyLastDelete();
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
