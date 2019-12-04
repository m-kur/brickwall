import React from 'react';
import { Button } from 'semantic-ui-react';

import { actions } from './store';
import { BrickAction, BrickDispatch } from './types';

type ConfirmedButtonProps = {
    icon: string;
    action: BrickAction;
    dispatch: BrickDispatch;
};
const ConfirmedButton: React.FC<ConfirmedButtonProps> = (props) => {
    const [confirm, setConfirm] = React.useState<boolean>(false);
    const { icon } = props;
    return (
        <Button
            floated="right"
            icon={icon}
            primary={confirm}
            onBlur={() => setConfirm(false)}
            onClick={() => {
                if (confirm) {
                    props.dispatch(props.action);
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
const BrickOperations: React.FC<BrickOperationsProps> = (props) => {
    const { index, hasNext, dispatch } = props;
    return (
        <>
            <Button
                disabled={index === 0}
                icon="arrow up"
                onClick={() => props.dispatch(actions.moveUp(props.index))}
            />
            <Button
                disabled={!hasNext}
                icon="arrow down"
                onClick={() => props.dispatch(actions.moveDown(props.index))}
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
        </>
    );
};

export default BrickOperations;
