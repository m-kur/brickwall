import { useReducer, useEffect, RefObject } from 'react';
import { createContainer } from 'unstated-next';
import * as R from 'ramda';
import shortid from 'shortid';

import store, { actions } from './store';
import { WallState, BrickData, BrickDispatch, WrappedDispatchFactory } from '../types';

const renewData = R.map<Partial<BrickData>, BrickData>((data) => ({
    id: data.id || shortid.generate(),
    type: data.type || 'default',
    meta: data.meta || {},
    value: data.value || '',
}));

type InitialState = {
    wallData?: Partial<BrickData>[];
    refugedData?: Partial<BrickData>[];
    currentBrick?: string;
    wrappedDispatch?: WrappedDispatchFactory;
};

const useStore = (initialState?: InitialState): [WallState, BrickDispatch] => {
    const baseState = initialState || {};
    const { wallData, refugedData, currentBrick } = baseState;
    const renewalState: WallState = {
        wallData: wallData ? renewData(wallData) : [],
        refugedData: refugedData ? renewData(refugedData) : [],
        currentBrick: currentBrick || '',
        shouldAdjustFocus: false,
    };
    const [state, dispatch] = useReducer(...store(renewalState));
    if (baseState.wrappedDispatch) {
        return [state, baseState.wrappedDispatch(dispatch)];
    }
    return [state, dispatch];
};

const WallStore = createContainer(useStore);
export default WallStore;

export const useAdjustFocus = (id: string, ref: RefObject<HTMLElement>) => {
    const [{ shouldAdjustFocus, currentBrick }, dispatch] = WallStore.useContainer();
    useEffect(() => {
        const { current } = ref;
        if (shouldAdjustFocus && current && id === currentBrick) {
            dispatch(actions.confirmFocusChange());
            const sel = window.getSelection();
            if (sel) {
                const caret = document.createTextNode('');
                current.appendChild(caret);
                const range = document.createRange();
                range.setStart(caret, 0);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                current.focus();
            }
        }
    });
};
