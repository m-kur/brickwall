import React, { Fragment, FunctionComponent, ReactElement, useState } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import { actions } from '../module/store';
import { BrickProps } from '../module/types';

const Header: FunctionComponent<BrickProps> = (props) => {
    const [tagName, setTagName] = useState('h1');
    const { editable, currentIndex, index, type, value, dispatch } = props;
    const focused = currentIndex === index;

    const optionButtons = R.addIndex<string, ReactElement>(R.map)((name, key) => (
        <Button
            key={key}
            basic
            disabled={tagName === name}
            onClick={() => setTagName(name)}
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
                        data: { type, value: state },
                    }));
                }}
            />
        </BrickHolder>
    );
};

export default Header;
