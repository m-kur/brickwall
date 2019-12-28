import React, { FunctionComponent, Fragment, useState } from 'react';
import { Button } from 'semantic-ui-react';

import { actions } from './store';
import { BrickAction, BrickDispatch } from './types';

type ConfirmedButtonProps = {
    icon: string;
    action: BrickAction;
    dispatch: BrickDispatch;
};
const ConfirmedButton: FunctionComponent<ConfirmedButtonProps> = (props) => {
    const [confirm, setConfirm] = useState(false);
    const { icon, action, dispatch } = props;
    return (
        <Button
            floated="right"
            icon={icon}
            primary={confirm}
            tabIndex={-1}
            onBlur={() => setConfirm(false)}
            onClick={() => {
                if (confirm) {
                    dispatch(action);
                }
                setConfirm(!confirm);
            }}
        />
    );
};

type BrickOperationsProps = {
    id: string;
    hasPrior: boolean;
    hasNext: boolean;
    dispatch: BrickDispatch;
};
const BrickOperations: FunctionComponent<BrickOperationsProps> = (props) => {
    const { id, hasPrior, hasNext, dispatch } = props;

    return (
        <Fragment>
            <Button
                disabled={!hasPrior}
                icon="arrow up"
                onClick={() => dispatch(actions.moveUp(id))}
            />
            <Button
                disabled={!hasNext}
                icon="arrow down"
                onClick={() => dispatch(actions.moveDown(id))}
                style={{ marginRight: 16 }}
            />
            <ConfirmedButton
                icon="share"
                action={actions.refugeData(id)}
                dispatch={dispatch}
            />
            <ConfirmedButton
                icon="trash"
                action={actions.deleteData(id)}
                dispatch={dispatch}
            />
            <ConfirmedButton
                icon="copy"
                action={actions.duplicateData(id)}
                dispatch={dispatch}
            />
        </Fragment>
    );
};

export default BrickOperations;
