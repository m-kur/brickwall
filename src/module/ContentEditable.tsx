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
    onKeyLastReturn?: (latest: string) => void;
    onKeyFirstDelete?: () => void;
};
const ContentEditable: FunctionComponent<ContentEditableProps> = (props) => {
    const { editable, tagName, html, el, style,
        onChange, onKeyLastReturn, onKeyFirstDelete } = props;
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
                    if (onKeyLastReturn && innerRef.current) {
                        const sel = document.getSelection();
                        if (sel && sel.rangeCount) {
                            const range = document.createRange();
                            range.selectNodeContents(innerRef.current);
                            const { endContainer, endOffset } = sel.getRangeAt(0);
                            range.setStart(endContainer, endOffset);
                            if (range.toString().length === 0) {
                                onKeyLastReturn(innerRef.current.innerHTML);
                            }
                        }
                    }
                }
                if (e.keyCode === 8 || e.keyCode === 46) {
                    if (onKeyFirstDelete && innerRef.current) {
                        if (innerRef.current.innerHTML.length === 0) {
                            e.preventDefault();
                            onKeyFirstDelete();
                        }
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
