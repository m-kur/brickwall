import { ActionFunctions, createAction, handleAction, Reducer } from 'redux-actions';
import * as R from 'ramda';
import shortid from 'shortid';

import { WallState, BrickData } from './types';

// Internal API --------------------------------------------------------------------

interface ReducerFactory<S, P> {
    (initialState: S): Reducer<S, P>;
}

const createReducer = <S, P>(
    actionType: ActionFunctions<P>,
    reducer: Reducer<S, P>,
): ReducerFactory<S, P> => (initialState: S) => handleAction(
        actionType,
        reducer,
        initialState,
    );

const combineReducer = <S, P>(reducers: ReducerFactory<S, P>[]) => (initialState: S) => {
    const combineded = R.reduce<Reducer<S, P>, Reducer<S, P>>(
        (previous, current) => (state, action) => current(previous(state, action), action),
        (state) => state,
        R.map((r) => r(initialState), reducers),
    );
    return [combineded, initialState] as [Reducer<S, P>, S];
};

// Actions & ReducerFactories --------------------------------------------------

const toggleEditable = createAction('TOGGLE_EDITABLE');
const toggleEditableReducer = createReducer<WallState, void>(
    toggleEditable,
    (state) => R.assoc('editable', !state.editable, state),
);

const updateCurrent = createAction('UPDATE_CURRENT');
const updateCurrentReducer = createReducer<WallState, number>(
    updateCurrent,
    (state, { payload }) => {
        const index = payload;
        return R.assoc('currentIndex', index, state);
    },
);

const moveUp = createAction<number>('MOVE_UP');
const moveUpReducer = createReducer<WallState, number>(
    moveUp,
    (state, { payload }) => {
        const index = payload;
        const dataLength = R.length(state.wallData);
        if (index > 0 && index < dataLength) {
            return R.mergeRight(state, {
                wallData: R.move(index, index - 1, state.wallData),
                currentIndex: state.currentIndex - 1,
            });
        }
        return state;
    },
);

const moveDown = createAction<number>('MOVE_DOWN');
const moveDownReducer = createReducer<WallState, number>(
    moveDown,
    (state, { payload }) => {
        const index = payload;
        const dataLength = R.length(state.wallData);
        if (index >= 0 && index < dataLength - 1) {
            return R.mergeRight(state, {
                wallData: R.move(index, index + 1, state.wallData),
                currentIndex: state.currentIndex + 1,
            });
        }
        return state;
    },
);

const updateData = createAction<{ index: number; data: BrickData }>('UPDATE_DATA');
const updateDataReducer = createReducer<WallState, { index: number; data: BrickData }>(
    updateData,
    (state, { payload: { index, data } }) => {
        const target = R.nth(index, state.wallData);
        if (target) {
            const modifiedData = R.mergeRight(target, data);
            return R.assoc('wallData', R.update(index, modifiedData, state.wallData), state);
        }
        const brandnewData = R.assoc('key', shortid.generate(), data);
        return R.assoc('wallData', R.append(brandnewData, state.wallData), state);
    },
);

const deleteData = createAction<number>('DELETE_DATA');
const deleteDataReducer = createReducer<WallState, number>(
    deleteData,
    (state, { payload }) => {
        const index = payload;
        const target = R.nth(index, state.wallData);
        if (target) {
            return R.assoc('wallData', R.remove(index, 1, state.wallData), state);
        }
        return state;
    },
);

const duplicateData = createAction<number>('DUPLICATE_DATA');
const duplicateDataReducer = createReducer<WallState, number>(
    duplicateData,
    (state, { payload }) => {
        const index = payload;
        const target = R.nth(index, state.wallData);
        if (target) {
            const duplicated = R.assoc('key', shortid.generate(), target);
            return R.mergeRight(state, {
                wallData: R.insert(index + 1, duplicated, state.wallData),
                currentIndex: state.currentIndex + 1,
            } as WallState);
        }
        return state;
    },
);

const refugeData = createAction<number>('REFUGE_DATA');
const refugeDataReducer = createReducer<WallState, number>(
    refugeData,
    (state, { payload }) => {
        const index = payload;
        const target = R.nth(index, state.wallData);
        if (target) {
            return R.mergeRight(state, {
                wallData: R.remove(index, 1, state.wallData),
                refugedData: R.append(target, state.refugedData),
            } as WallState);
        }
        return state;
    },
);


export const actions = {
    toggleEditable,
    updateCurrent,
    moveUp,
    moveDown,
    updateData,
    deleteData,
    duplicateData,
    refugeData,
};

// Export for unit tests.
export const factories = {
    toggleEditableReducer,
    updateCurrentReducer,
    moveUpReducer,
    moveDownReducer,
    updateDataReducer,
    deleteDataReducer,
    duplicateDataReducer,
    refugeDataReducer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default combineReducer<WallState, any>(R.values(factories));
