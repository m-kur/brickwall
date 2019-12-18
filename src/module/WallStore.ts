import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import * as R from 'ramda';
import shortid from 'shortid';

import store from './store';
import { WallState, BrickData, BrickDispatch, WrappedDispatchFactory } from './types';

const renewData = R.map<Partial<BrickData>, BrickData>((data) => ({
    id: data.id || shortid.generate(),
    type: data.type || 'default',
    meta: data.meta || {},
    value: data.value || '',
}));

type InitialState = {
    editable: boolean;
    wallData?: Partial<BrickData>[];
    refugedData?: Partial<BrickData>[];
    currentIndex?: number;
    wrappedDispatch?: WrappedDispatchFactory;
};

const useStore = (initialState?: InitialState): [WallState, BrickDispatch] => {
    const baseState = initialState || { editable: true };
    const { editable, wallData, refugedData, currentIndex } = baseState;
    const dataLength = wallData ? R.length(wallData) : 0;
    const renewalState: WallState = {
        editable,
        wallData: wallData ? renewData(wallData) : [],
        refugedData: refugedData ? renewData(refugedData) : [],
        currentIndex: currentIndex !== undefined ? currentIndex : dataLength,
        changingFocus: false,
    };
    const [state, dispatch] = useReducer(...store(renewalState));
    if (baseState.wrappedDispatch) {
        return [state, baseState.wrappedDispatch(dispatch)];
    }
    return [state, dispatch];
};

export default createContainer(useStore);
