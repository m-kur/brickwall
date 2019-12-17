import { FunctionComponent, Dispatch } from 'react';
import { Action } from 'redux-actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrickAction = Action<any>;

export type BrickDispatch = Dispatch<BrickAction>;

export type WrappedDispatchFactory = (dispatch: BrickDispatch) => BrickDispatch;

export type BrickData = {
    id: string;
    type: string;
    meta: Record<string, string|number>;
    value: string;
};

export type BrickProps = {
    index: number;
    // el: RefObject<HTMLElement>;
};

export type WallState = {
    editable: boolean;
    wallData: BrickData[];
    refugedData: BrickData[];
    currentIndex: number;
    focusChanging?: boolean;
}

export type BrickDefine = {
    icon: string;
    brick: FunctionComponent<BrickProps>;
    empty?: boolean;
}

export type WallDefine = {
    brickDefines: Record<string, BrickDefine>;
    defaultBrickType: string;
};
