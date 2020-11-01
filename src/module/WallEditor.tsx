import React, { FunctionComponent } from 'react';
import * as R from 'ramda';

import WallStore from './WallStore';
import { actions } from './store';
import NewBrick from './NewBrick';
import { WallProps } from '../types';

const WallEditor: FunctionComponent<WallProps> = (props) => {
    const { editable, brickDefines, defaultBrickType } = props;
    const [state, dispatch] = WallStore.useContainer();

    return (
        <>
            {R.map(
                (brickData) => {
                    let type = brickData.type || defaultBrickType;
                    if (type === 'default') {
                        type = defaultBrickType;
                    }
                    const define = R.prop(type, brickDefines);
                    if (define) {
                        const { id, value } = brickData;
                        if (!value && !define.empty) {
                            dispatch(actions.updateCurrent({ id, offset: -1, focus: true }));
                            dispatch(actions.deleteData(id));
                            return null;
                        }
                        return <define.brick key={id} id={id} editable={editable} />;
                    }
                    throw new Error(`"${type}" component not found`);
                },
                state.wallData,
            )}
            <NewBrick
                editable={editable}
                brickDefines={brickDefines}
                defaultBrickType={defaultBrickType}
            />
        </>
    );
};

export default WallEditor;
