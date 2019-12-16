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
    wrappedDispatch?: WrappedDispatchFactory;
};

const useStore = (initialState?: InitialState): [WallState, BrickDispatch] => {
    const baseState = initialState || { editable: true };
    const renewState = R.mergeRight(baseState, {
        editable: baseState.editable,
        wallData: baseState.wallData ? renewData(baseState.wallData) : [],
        refugedData: baseState.refugedData ? renewData(baseState.refugedData) : [],
        currentIndex: baseState.wallData ? R.length(baseState.wallData) : 0,
    });
    const [state, dispatch] = useReducer(...store(renewState));
    if (baseState.wrappedDispatch) {
        return [state, baseState.wrappedDispatch(dispatch)];
    }
    return [state, dispatch];
};

export default createContainer(useStore);
