import React from 'react';
import { Button } from 'semantic-ui-react';

type InlineToolProps = {
    icon: string;
    cmd?: string;
    args?: string;
}

const InlineTool: React.FC<InlineToolProps> = (props) => {
    return (
        // TODO: floated='left' はいらない？
        <Button basic floated='left' icon={props.icon} onClick={(e) => {
            if (props.cmd) {
                e.preventDefault();
                document.execCommand(props.cmd, false, props.args);
                const sel = document.getSelection();
                if (sel) {
                    sel.getRangeAt(0).collapse(sel.focusOffset < sel.anchorOffset);
                }
            }
        }}/>
    );
}

export default InlineTool;
