import { FunctionComponent, Dispatch } from 'react';
import { Action } from 'redux-actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrickAction = Action<any>;

export type BrickDispatch = Dispatch<BrickAction>;

export type BrickData = {
    key: string;
    type: string;
    meta: Record<string, string|number>;
    value: string;
};

export type BrickState = {
    editable: boolean;
    focused: boolean;
    hasNext: boolean;
    index: number;
    dispatch: BrickDispatch;
};

export type BrickProps = BrickState & BrickData;

export type WallProps = {
    editable: boolean;
    wallData: Partial<BrickData>[];
    refugedData: Partial<BrickData>[];
}

export type WallState = {
    currentIndex: number;
} & WallProps;

export type BrickDefine = {
    icon: string;
    brick: FunctionComponent<BrickProps>;
    empty?: boolean;
}

export type WallDefine = {
    brickDefines: Record<string, BrickDefine>;
    defaultBrickType: string;
};
