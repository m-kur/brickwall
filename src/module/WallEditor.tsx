import React, { ReactElement, Fragment, FunctionComponent } from 'react';
import * as R from 'ramda';

import WallStore from './WallStore';
import { actions } from './store';
import NewBrick from './NewBrick';
import { BrickData, WallDefine } from './types';

const WallEditor: FunctionComponent</* WallProps & */WallDefine> = (props) => {
    const { brickDefines, defaultBrickType } = props;
    const [state, dispatch] = WallStore.useContainer();
    const dataLength = R.length(state.wallData);

    return (
        <Fragment>
            {R.addIndex<Partial<BrickData>, ReactElement|null>(R.map)(
                (brickData, i) => {
                    const type = brickData.type || defaultBrickType;
                    const define = R.prop(type, brickDefines);
                    if (define) {
                        if (!brickData.value && !define.empty) {
                            dispatch(actions.deleteData(i));
                            if (i !== 0) {
                                dispatch(actions.updateCurrent(i - 1));
                            }
                            return null;
                        }
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const key = brickData.id!;
                        return (
                            <define.brick
                                key={key}
                                focused={state.currentIndex === i}
                                hasNext={i < dataLength - 1}
                                index={i}
                            />
                        );
                    }
                    throw new Error(`"${type}" component not found`);
                },
                state.wallData,
            )}
            <NewBrick
                focused={state.currentIndex === dataLength}
                hasNext={false}
                index={R.length(state.wallData)}
                brickDefines={brickDefines}
                defaultBrickType={defaultBrickType}
            />
        </Fragment>
    );
};

export default WallEditor;
