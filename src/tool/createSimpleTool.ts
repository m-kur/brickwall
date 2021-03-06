import { ToolDefine } from '../types';

const createSimpleTool = (icon: string, cmd: string, args?: string): ToolDefine => ({
    icon,
    addFormat: () => {
        document.execCommand(cmd, false, args);
        return null;
    },
    isFormatted: () => document.queryCommandState(cmd),
});

export default createSimpleTool;
