import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import * as R from 'ramda';
import shortid from 'shortid';

import store from './store';
import { WallState, BrickData } from './types';

const renewId = R.map<Partial<BrickData>, Partial<BrickData>>(
    (data) => R.assoc('id', shortid.generate(), data),
);

type InitialState = {
    editable?: boolean;
    wallData?: Partial<BrickData>[];
    refugedData?: Partial<BrickData>[];
};

const reducer = (initialState?: WallState) => {
    const state = initialState || {
        editable: true,
        wallData: [],
        refugedData: [],
        currentIndex: 0,
    };
    const renewState = R.assoc('wallData', renewId(state.wallData), state);
    return useReducer(...store(renewState));
};

export default createContainer(reducer);
