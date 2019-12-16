import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import * as R from 'ramda';
import shortid from 'shortid';

import store from './store';
import { WallState, BrickData, BrickDispatch } from './types';

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
};

const useStore = (initialState?: InitialState): [WallState, BrickDispatch] => {
    const state = initialState || { editable: true };
    const renewState = R.mergeRight(state, {
        editable: state.editable,
        wallData: state.wallData ? renewData(state.wallData) : [],
        refugedData: state.refugedData ? renewData(state.refugedData) : [],
        currentIndex: state.wallData ? R.length(state.wallData) : 0,
    });
    return useReducer(...store(renewState));
};

export default createContainer(useStore);
