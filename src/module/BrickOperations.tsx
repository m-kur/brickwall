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
    index: number;
    dispatch: BrickDispatch;
    hasNext: boolean;
};
const BrickOperations: FunctionComponent<BrickOperationsProps> = (props) => {
    const { index, hasNext, dispatch } = props;

    return (
        <Fragment>
            <Button
                disabled={index === 0}
                icon="arrow up"
                onClick={() => dispatch(actions.moveUp(index))}
            />
            <Button
                disabled={!hasNext}
                icon="arrow down"
                onClick={() => dispatch(actions.moveDown(index))}
                style={{ marginRight: 16 }}
            />
            <ConfirmedButton
                icon="share"
                action={actions.refugeData(index)}
                dispatch={dispatch}
            />
            <ConfirmedButton
                icon="trash"
                action={actions.deleteData(index)}
                dispatch={dispatch}
            />
            <ConfirmedButton
                icon="copy"
                action={actions.duplicateData(index)}
                dispatch={dispatch}
            />
        </Fragment>
    );
};

export default BrickOperations;
