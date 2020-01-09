import { ReactElement, FunctionComponent, Dispatch, RefObject } from 'react';
import { Action } from 'redux-actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrickAction = Action<any>;

export type BrickDispatch = Dispatch<BrickAction>;

export type WrappedDispatchFactory = (dispatch: BrickDispatch) => BrickDispatch;

export type BrickData = {
    id: string;
    type: string;
    meta: Record<string, string|number|boolean>;
    value: string;
};

export type WallState = {
    wallData: BrickData[];
    refugedData: BrickData[];
    currentBrick: string;
    shouldAdjustFocus: boolean;
};

export type ExtentionProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    el: RefObject<any>;
    width: number;
    close: (formatter?: () => void) => void;
};

export type ToolDefine = {
    icon: string;
    addFormat: (props: ExtentionProps) => ReactElement|null;
    removeFormat?: () => void;
    isFormatted?: () => boolean;
};

export type BrickProps = {
    id: string;
    editable: boolean;
};

export type BrickDefine = {
    icon: string;
    brick: FunctionComponent<BrickProps>;
    empty?: boolean;
};

export type WallProps = {
    editable: boolean;
    brickDefines: Record<string, BrickDefine>;
    defaultBrickType: string;
};
