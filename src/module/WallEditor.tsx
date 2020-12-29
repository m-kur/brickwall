import React from 'react';

import WallStore from './WallStore';
import { actions } from './store';
import NewBrick from './NewBrick';
import { WallProps } from '../types';

function WallEditor(props: WallProps): JSX.Element {
    const { editable, brickDefines, defaultBrickType } = props;
    const [state, dispatch] = WallStore.useContainer();

    return (
        <>
            {state.wallData.map(
                (brickData) => {
                    let type = brickData.type || defaultBrickType;
                    if (type === 'default') {
                        type = defaultBrickType;
                    }
                    const define = brickDefines[type];
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
            )}
            <NewBrick
                editable={editable}
                brickDefines={brickDefines}
                defaultBrickType={defaultBrickType}
            />
        </>
    );
}

export default WallEditor;
