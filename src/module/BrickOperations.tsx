import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import { actions } from './store';
import { BrickDispatch } from '../types';

type ConfirmedButtonProps = {
    icon: string;
    onConfirm: () => void;
};
function ConfirmedButton(props: ConfirmedButtonProps): JSX.Element {
    const [confirm, setConfirm] = useState(false);
    const { icon, onConfirm } = props;
    return (
        <Button
            floated="right"
            icon={icon}
            primary={confirm}
            tabIndex={-1}
            onBlur={() => setConfirm(false)}
            onClick={() => {
                if (confirm) {
                    onConfirm();
                }
                setConfirm(!confirm);
            }}
        />
    );
}

type BrickOperationsProps = {
    id: string;
    hasPrior: boolean;
    hasNext: boolean;
    dispatch: BrickDispatch;
};
function BrickOperations(props: BrickOperationsProps): JSX.Element {
    const { id, hasPrior, hasNext, dispatch } = props;

    return (
        <>
            <Button
                disabled={!hasPrior}
                icon="arrow up"
                onClick={() => {
                    dispatch(actions.updateCurrent({ id, focus: true, offset: 0 }));
                    dispatch(actions.moveUp(id));
                }}
            />
            <Button
                disabled={!hasNext}
                icon="arrow down"
                onClick={() => {
                    dispatch(actions.updateCurrent({ id, focus: true, offset: 0 }));
                    dispatch(actions.moveDown(id));
                }}
                style={{ marginRight: 16 }}
            />
            <ConfirmedButton
                icon="share"
                onConfirm={() => {
                    dispatch(actions.updateCurrent({ id, focus: true, offset: -1 }));
                    dispatch(actions.refugeData(id));
                }}
            />
            <ConfirmedButton
                icon="trash"
                onConfirm={() => {
                    dispatch(actions.updateCurrent({ id, focus: true, offset: -1 }));
                    dispatch(actions.deleteData(id));
                }}
            />
            <ConfirmedButton
                icon="copy"
                onConfirm={() => {
                    dispatch(actions.duplicateData(id));
                    dispatch(actions.updateCurrent({ id, focus: true, offset: 1 }));
                }}
            />
        </>
    );
}

export default BrickOperations;
