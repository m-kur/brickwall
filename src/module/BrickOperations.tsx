import React from 'react';
import { Button } from 'semantic-ui-react';
import { Action } from 'redux-actions';

import { actions } from './store';

type ConfirmedButtonProps = {
    icon: string;
    action: Action<any>;
    dispatch: React.Dispatch<Action<any>>;
};
const ConfirmedButton: React.FC<ConfirmedButtonProps> = (props) => {
    const [confirm, setConfirm] = React.useState<boolean>(false);
    return (
        <Button
            floated='right'
            icon={props.icon}
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
}

type BrickOperationsProps = {
    index: number;
    dispatch: React.Dispatch<Action<any>>;
    hasNext: boolean;
};
const BrickOperations: React.FC<BrickOperationsProps> = (props) => {
    return (
        <React.Fragment>
            <Button
                disabled={props.index === 0}
                icon='arrow up'
                onClick={() => props.dispatch(actions.moveUp(props.index))}
            />
            <Button
                disabled={!props.hasNext}
                icon='arrow down'
                onClick={() => props.dispatch(actions.moveDown(props.index))}
                style={{ marginRight: 16 }}
            />
            <ConfirmedButton
                icon='share'
                action={actions.refugeData(props.index)}
                dispatch={props.dispatch}
            />
            <ConfirmedButton
                icon='trash'
                action={actions.deleteData(props.index)}
                dispatch={props.dispatch}
            />
            <ConfirmedButton
                icon='copy'
                action={actions.duplicateData(props.index)}
                dispatch={props.dispatch}
            />
        </React.Fragment>
    );
}

export default BrickOperations;
