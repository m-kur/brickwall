import React, { FunctionComponent, useState, useRef } from 'react';
import ReactContentEditable from 'react-contenteditable';

type ContentEditableProps = {
    editable: boolean;
    tagName?: string;
    html: string;
    onDispatch: (state: string) => void;
};
const ContentEditable: FunctionComponent<ContentEditableProps> = (props) => {
    const { editable, tagName, html, onDispatch } = props;
    const [state, setState] = useState(html);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <ReactContentEditable
            contentEditable={editable}
            html={state}
            innerRef={ref}
            style={{ outline: 'none' }}
            tagName={tagName}
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    if (ref.current) {
                        const { innerHTML } = ref.current;
                        if (state !== innerHTML) {
                            setState(innerHTML);
                            onDispatch(innerHTML);
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
                if (state !== value) {
                    setState(value);
                    onDispatch(value);
                }
            }}
        />
    );
};

export default ContentEditable;
