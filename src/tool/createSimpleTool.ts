import { ToolDefine } from '../module/types';

const createSimpleTool = (icon: string, cmd: string, args?: string): ToolDefine => ({
    icon,
    addFormat: () => document.execCommand(cmd, false, args),
    isFormatted: () => document.queryCommandState(cmd),
});

export default createSimpleTool;
