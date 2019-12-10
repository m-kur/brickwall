import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import { actions } from '../module/store';
import { BrickProps } from '../module/types';

const Header: FunctionComponent<BrickProps> = (props) => {
    const { editable, focused, index, key, type, meta, value, dispatch } = props;
    const tagName = (R.prop('tagName', meta) || 'h1') as string;

    const optionButtons = R.addIndex<string, ReactElement>(R.map)((name, i) => (
        <Button
            key={i}
            basic
            disabled={tagName === name}
            onClick={() => dispatch(actions.updateData({
                index,
                data: { key, type, meta: { tagName: name }, value },
            }))}
        >
            {name}
        </Button>
    ));

    return (
        <BrickHolder
            {...props}
            options={(
                <Fragment>
                    {optionButtons(['h1', 'h2', 'h3', 'h4', 'h5'])}
                </Fragment>
            )}
        >
            <ContentEditable
                tagName={tagName}
                editable={editable && focused}
                html={value}
                onChange={(state) => {
                    dispatch(actions.updateData({
                        index,
                        data: { key, type, meta: { tagName }, value: state },
                    }));
                }}
            />
        </BrickHolder>
    );
};

export default Header;
