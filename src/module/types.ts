import React from 'react';
import { Action } from 'redux-actions';

export type BrickData = {
    key?: string;
    type?: string;
    value?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrickAction = Action<any>;

export type BrickDispatch = React.Dispatch<BrickAction>;

export type BrickState = {
    index: number;
    dispatch: BrickDispatch;
};

export type WallState = {
    editable: boolean;
    currentIndex: number;
    wallData: BrickData[];
    refugedData: BrickData[];
}

export type BrickProps = BrickState & WallState;

export type BrickDefine = {
    icon: string;
    brick: React.FC<BrickProps>;
}

export type WallDefine = {
    brickDefines: Record<string, BrickDefine>;
    defaultBrickType: string;
};

export type WallProps = WallState & WallDefine;
