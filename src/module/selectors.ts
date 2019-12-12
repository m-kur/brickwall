import { createSelector } from 'reselect';
import * as R from 'ramda';

import { WallState, BrickState, BrickData } from './types';

const getWallData = (state: WallState) => state.wallData;
const getIndex = (state: WallState, props: BrickState) => props.index;

const getBrickData = createSelector(
    [getWallData, getIndex],
    (wallData: Partial<BrickData>[], index: number) => {
        const data = R.nth(index, wallData);
        if (!data) {
            throw new RangeError();
        }
        return R.mergeRight({ id: '', type: '', meta: {}, value: '' }, data) as BrickData;
    },
);

const getDataLength = createSelector(
    getWallData,
    (wallData: Partial<BrickData>[]) => R.length(wallData),
);

export default {
    getBrickData,
    getDataLength,
};
