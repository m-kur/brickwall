import React, { FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';

type CommandToolProps = {
    icon: string;
    cmd?: string;
    args?: string;
}

const CommandTool: FunctionComponent<CommandToolProps> = (props) => {
    const { icon, cmd, args } = props;

    return (
        <Button
            basic
            icon={icon}
            onClick={(e) => {
                if (cmd) {
                    e.preventDefault();
                    document.execCommand(cmd, false, args);
                    const sel = document.getSelection();
                    if (sel) {
                        sel.getRangeAt(0).collapse(sel.focusOffset < sel.anchorOffset);
                    }
                }
            }}
        />
    );
};

export default CommandTool;
