import { ActionFunctions, createAction, handleAction, Reducer } from 'redux-actions';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import shortid from 'shortid';

import { WallState, BrickData, BrickProps } from './types';

// Internal API -------------------------------------------------------------------------

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
        R.map((reducerFactory) => reducerFactory(initialState), reducers),
    );
    return [combineded, initialState] as [Reducer<S, P>, S];
};

const findBrick = (id: string, wallData: BrickData[]) => R.findIndex(R.propEq('id', id), wallData);

// Actions & ReducerFactories -----------------------------------------------------------

const toggleEditable = createAction('TOGGLE_EDITABLE');
const toggleEditableReducer = createReducer<WallState, void>(
    toggleEditable,
    (state) => R.assoc('editable', !state.editable, state),
);

type updateCurrentProps = {
    id: string;
    focus: boolean;
    offset: -1|0|1;
}
const updateCurrent = createAction<updateCurrentProps>('UPDATE_CURRENT');
const updateCurrentReducer = createReducer<WallState, updateCurrentProps>(
    updateCurrent,
    (state, action) => {
        const { payload: { id, focus, offset } } = action;
        const dataLength = R.length(state.wallData);
        const index = id === '' ? dataLength : findBrick(id, state.wallData);
        if (index !== -1) {
            if (index + offset === dataLength) {
                return R.mergeRight(state, {
                    currentBrick: '',
                    shouldAdjustFocus: focus,
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const brick = R.nth(index + offset, state.wallData)!;
            return R.mergeRight(state, {
                currentBrick: brick.id,
                shouldAdjustFocus: focus,
            });
        }
        throw new RangeError(JSON.stringify(action));
    },
);

const confirmFocusChange = createAction('CONFIRM_FOCUS_CHANGE');
const confirmFocusChangeReducer = createReducer<WallState, void>(
    confirmFocusChange,
    (state) => R.assoc('shouldAdjustFocus', false, state),
);

const moveUp = createAction<string>('MOVE_UP');
const moveUpReducer = createReducer<WallState, string>(
    moveUp,
    (state, action) => {
        const { payload } = action;
        const index = findBrick(payload, state.wallData);
        const dataLength = R.length(state.wallData);
        if (index > 0 && index < dataLength) {
            return R.assoc('wallData', R.move(index, index - 1, state.wallData), state);
        }
        throw new RangeError(JSON.stringify(action));
    },
);

const moveDown = createAction<string>('MOVE_DOWN');
const moveDownReducer = createReducer<WallState, string>(
    moveDown,
    (state, action) => {
        const index = findBrick(action.payload, state.wallData);
        const dataLength = R.length(state.wallData);
        if (index >= 0 && index < dataLength - 1) {
            return R.assoc('wallData', R.move(index, index + 1, state.wallData), state);
        }
        throw new RangeError(JSON.stringify(action));
    },
);

const updateData = createAction<BrickData>('UPDATE_DATA');
const updateDataReducer = createReducer<WallState, BrickData>(
    updateData,
    (state, { payload }) => {
        const { id } = payload;
        const index = findBrick(id, state.wallData);
        if (index !== -1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const modifiedData = R.mergeRight(R.nth(index, state.wallData)!, payload);
            return R.assoc('wallData', R.update(index, modifiedData, state.wallData), state);
        }
        const brandnewData = R.assoc('id', shortid.generate(), payload);
        return R.assoc('wallData', R.append(brandnewData, state.wallData), state);
    },
);

const deleteData = createAction<string>('DELETE_DATA');
const deleteDataReducer = createReducer<WallState, string>(
    deleteData,
    (state, action) => {
        const index = findBrick(action.payload, state.wallData);
        if (index !== -1) {
            return R.assoc('wallData', R.remove(index, 1, state.wallData), state);
        }
        throw new RangeError(JSON.stringify(action));
    },
);

const duplicateData = createAction<string>('DUPLICATE_DATA');
const duplicateDataReducer = createReducer<WallState, string>(
    duplicateData,
    (state, action) => {
        const index = findBrick(action.payload, state.wallData);
        if (index !== -1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const target = R.nth(index, state.wallData)!;
            const duplicated = R.assoc('id', shortid.generate(), target);
            return R.mergeRight(state, {
                wallData: R.insert(index + 1, duplicated, state.wallData),
                currentBrick: duplicated.id,
            });
        }
        throw new RangeError(JSON.stringify(action));
    },
);

const refugeData = createAction<string>('REFUGE_DATA');
const refugeDataReducer = createReducer<WallState, string>(
    refugeData,
    (state, action) => {
        const index = findBrick(action.payload, state.wallData);
        if (index !== -1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const target = R.nth(index, state.wallData)!;
            return R.mergeRight(state, {
                wallData: R.remove(index, 1, state.wallData),
                refugedData: R.append(target, state.refugedData),
            });
        }
        throw new RangeError(JSON.stringify(action));
    },
);

// selectors ----------------------------------------------------------------------------

const getWallData = (state: WallState) => state.wallData;
const getId = (state: WallState, props: BrickProps) => props.id;
const getCurrentBrick = (state: WallState) => state.currentBrick;

const getBrickData = createSelector(
    getWallData,
    getId,
    (wallData, id) => {
        const index = findBrick(id, wallData);
        if (index !== -1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return R.nth(index, wallData)!;
        }
        throw new RangeError();
    },
);

const getDataLength = createSelector(
    getWallData,
    (wallData) => R.length(wallData),
);

const isFocused = createSelector(
    getId,
    getCurrentBrick,
    (id, currentBrick) => id === currentBrick,
);

const isFluid = createSelector(
    getBrickData,
    (brick) => Boolean(R.prop('fluid', brick.meta)),
);

const hasPrior = createSelector(
    getWallData,
    getId,
    (wallData, id) => {
        const index = findBrick(id, wallData);
        if (index !== -1) {
            return index > 0;
        }
        throw new RangeError();
    },
);

const hasNext = createSelector(
    getWallData,
    getId,
    getDataLength,
    (wallData, id, length) => {
        const index = findBrick(id, wallData);
        if (index !== -1) {
            return index < length - 1;
        }
        throw new RangeError();
    },
);

// exports ------------------------------------------------------------------------------

export const actions = {
    toggleEditable,
    updateCurrent,
    confirmFocusChange,
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
    confirmFocusChangeReducer,
    moveUpReducer,
    moveDownReducer,
    updateDataReducer,
    deleteDataReducer,
    duplicateDataReducer,
    refugeDataReducer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default combineReducer<WallState, any>(R.values(factories));

export const selectors = {
    getBrickData,
    getDataLength,
    isFocused,
    isFluid,
    hasPrior,
    hasNext,
};
