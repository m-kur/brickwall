import React, { FunctionComponent, useRef } from 'react';
import ReactContentEditable from 'react-contenteditable';

type ContentEditableProps = {
    editable: boolean;
    tagName?: string;
    html: string;
    onChange: (latest: string) => void;
    onKeyReturn?: (latest: string) => void;
};
const ContentEditable: FunctionComponent<ContentEditableProps> = (props) => {
    const { editable, tagName, html, onChange, onKeyReturn } = props;
    const ref = useRef<HTMLDivElement>(null);

    return (
        <ReactContentEditable
            contentEditable={editable}
            html={html}
            innerRef={ref}
            style={{ outline: 'none' }}
            tagName={tagName}
            onKeyDown={(e) => {
                if (e.keyCode === 13 && onKeyReturn) {
                    e.preventDefault();
                    if (ref.current) {
                        const { innerHTML } = ref.current;
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
