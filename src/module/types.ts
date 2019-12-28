import { FunctionComponent, Dispatch } from 'react';
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
    editable: boolean;
    wallData: BrickData[];
    refugedData: BrickData[];
    currentBrick: string;
    shouldAdjustFocus: boolean;
}

export type BrickProps = {
    id: string;
};

export type BrickDefine = {
    icon: string;
    brick: FunctionComponent<BrickProps>;
    empty?: boolean;
}

export type WallDefine = {
    brickDefines: Record<string, BrickDefine>;
    defaultBrickType: string;
};
