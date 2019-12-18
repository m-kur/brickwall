import { useReducer, useEffect, RefObject } from 'react';
import { createContainer } from 'unstated-next';
import * as R from 'ramda';
import shortid from 'shortid';

import store, { actions } from './store';
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

export const useAdjustFocus = (index: number, ref: RefObject<HTMLElement>) => {
    const [{ shouldAdjustFocus, currentIndex }, dispatch] = WallStore.useContainer();
    useEffect(() => {
        const { current } = ref;
        if (shouldAdjustFocus && current && index === currentIndex) {
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
