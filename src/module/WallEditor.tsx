import React from 'react';
import * as R from 'ramda';
import shortid from 'shortid';

import store, { actions } from './store';
import NewBrick from './NewBrick';
import { BrickData, WallProps } from './types';

const renewId = R.map<BrickData, BrickData>(data => R.assoc('key', shortid.generate(), data));

const WallEditor: React.FC<WallProps> = (props) => {
    const [state, dispatch] = store(R.assoc('wallData', renewId(props.wallData), props));
    const dataLength = R.length(state.wallData);
    if (state.currentIndex < 0 || dataLength < state.currentIndex) {
        dispatch(actions.updateCurrent(dataLength));
    }
    return (
        <React.Fragment>
            {R.addIndex<BrickData, React.ReactElement|null>(R.map)(
                (brickData, index) => {
                    const type = brickData.type || props.defaultBrickType;
                    const define = R.prop(type, props.brickDefines);
                    if (define) {
                        return (
                            <span key={brickData.key}>
                                <define.brick
                                    {...state}
                                    index={index}
                                    dispatch={dispatch}
                                />
                            </span>
                        );
                    }
                    throw new Error(`"${define}" component not found`);
                },
                state.wallData,
            )}
            <NewBrick
                {...state}
                index={dataLength}
                dispatch={dispatch}
                brickDefines={props.brickDefines}
                defaultBrickType={props.defaultBrickType}
            />
        </React.Fragment>
    );
}

export default WallEditor;
