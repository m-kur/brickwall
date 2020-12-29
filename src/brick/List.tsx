import React from 'react';

// import WallStore from '../module/WallStore';
import BrickHolder from '../module/BrickHolder';
import { BrickProps } from '../types';

function List(props: BrickProps): JSX.Element {
    const { editable } = props;
    // const [state] = WallStore.useContainer();
    return (
        <BrickHolder {...props}>
            <ul contentEditable={editable} style={{ outline: 'none' }} />
        </BrickHolder>
    );
}

export default List;
