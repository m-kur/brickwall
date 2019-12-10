import React, { ReactElement, Fragment, FunctionComponent, useReducer } from 'react';
import * as R from 'ramda';
import shortid from 'shortid';

import store from './store';
import NewBrick from './NewBrick';
import { BrickData, WallProps, WallDefine } from './types';

const renewId = R.map<Partial<BrickData>, Partial<BrickData>>(
    (data) => R.assoc('key', shortid.generate(), data),
);

const WallEditor: FunctionComponent<WallProps & WallDefine> = (props) => {
    const { editable, wallData, refugedData, brickDefines, defaultBrickType } = props;
    const [state, dispatch] = useReducer(...store({
        currentIndex: R.length(wallData),
        editable,
        wallData: renewId(wallData),
        refugedData,
    }));
    const dataLength = R.length(state.wallData);
    return (
        <Fragment>
            {R.addIndex<Partial<BrickData>, ReactElement|null>(R.map)(
                (brickData, i) => {
                    const type = brickData.type || defaultBrickType;
                    const define = R.prop(type, brickDefines);
                    if (define) {
                        return (
                            <define.brick
                                editable={state.editable}
                                focused={state.currentIndex === i}
                                hasNext={i < dataLength - 1}
                                index={i}
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                key={brickData.key!}
                                type={type}
                                meta={brickData.meta || {}}
                                value={brickData.value || ''}
                                dispatch={dispatch}
                            />
                        );
                    }
                    throw new Error(`"${type}" component not found`);
                },
                state.wallData,
            )}
            <NewBrick
                editable={state.editable}
                focused={state.currentIndex === dataLength}
                hasNext={false}
                index={dataLength}
                dispatch={dispatch}
                brickDefines={brickDefines}
                defaultBrickType={defaultBrickType}
            />
        </Fragment>
    );
};

export default WallEditor;
