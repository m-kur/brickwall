import { FC, Dispatch } from 'react';
import { Action } from 'redux-actions';

export type BrickData = {
    key?: string;
    type?: string;
    meta?: Record<string, string|number>;
    value?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrickAction = Action<any>;

export type BrickDispatch = Dispatch<BrickAction>;

export type BrickState = {
    // editable: boolean;
    index: number;
    type: string;
    meta: Record<string, string|number>;
    value: string;
    dispatch: BrickDispatch;
};

export type WallState = {
    editable: boolean;
    currentIndex: number;
    wallData: BrickData[];
    refugedData: BrickData[];
}

// TODO: WallStateを取り除く
export type BrickProps = BrickState & WallState;

export type BrickDefine = {
    icon: string;
    brick: FC<BrickProps>;
    empty?: boolean;
}

export type WallDefine = {
    brickDefines: Record<string, BrickDefine>;
    defaultBrickType: string;
};

export type WallProps = WallState & WallDefine;
