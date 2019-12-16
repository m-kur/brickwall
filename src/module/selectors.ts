import { createSelector } from 'reselect';
import * as R from 'ramda';

import { WallState, BrickState, BrickData } from './types';

const getWallData = (state: WallState) => state.wallData;
const getIndex = (state: WallState, props: BrickState) => props.index;

const getBrickData = createSelector(
    getWallData,
    getIndex,
    (wallData: BrickData[], index: number) => {
        const data = R.nth(index, wallData);
        if (data) {
            return data;
        }
        throw new RangeError();
    },
);

const getDataLength = createSelector(
    getWallData,
    (wallData: BrickData[]) => R.length(wallData),
);

export default {
    getBrickData,
    getDataLength,
};
