import React, { ReactElement, Fragment, FunctionComponent } from 'react';
import * as R from 'ramda';
import shortid from 'shortid';

import store, { actions } from './store';
import NewBrick from './NewBrick';
import { BrickData, WallProps } from './types';

const renewId = R.map<BrickData, BrickData>((data) => R.assoc('key', shortid.generate(), data));

const WallEditor: FunctionComponent<WallProps> = (props) => {
    const { wallData, brickDefines, defaultBrickType } = props;
    const [state, dispatch] = store(R.assoc('wallData', renewId(wallData), props));
    const dataLength = R.length(state.wallData);

    if (state.currentIndex < 0 || dataLength < state.currentIndex) {
        dispatch(actions.updateCurrent(dataLength));
    }

    return (
        <Fragment>
            {R.addIndex<BrickData, ReactElement|null>(R.map)(
                (brickData, index) => {
                    const type = brickData.type || defaultBrickType;
                    const define = R.prop(type, brickDefines);
                    if (define) {
                        return (
                            <define.brick
                                {...state}
                                key={brickData.key}
                                index={index}
                                type={type}
                                meta={brickData.meta || {}}
                                value={brickData.value || ''}
                                dispatch={dispatch}
                            />
                        );
                    }
                    throw new Error(`"${define}" component not found`);
                },
                state.wallData,
            )}
            <NewBrick
                {...state}
                index={dataLength}
                type="_new_"
                meta={{}}
                value=""
                dispatch={dispatch}
                brickDefines={brickDefines}
                defaultBrickType={defaultBrickType}
            />
        </Fragment>
    );
};

export default WallEditor;
