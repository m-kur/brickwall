import React, { Fragment, FunctionComponent, ReactElement, useRef } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import WallStore, { useAdjustFocus } from '../module/WallStore';
import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import { actions, selectors } from '../module/store';
import { BrickProps } from '../types';

const Header: FunctionComponent<BrickProps> = (props) => {
    const { editable } = props;
    const [state, dispatch] = WallStore.useContainer();
    const { id, type, meta, value } = selectors.getBrickData(state, props);
    const focused = selectors.isFocused(state, props);
    const tagName = (R.prop('tagName', meta) || 'h1') as string;
    const el = useRef<HTMLElement>(null);
    useAdjustFocus(id, el);

    const optionButtons = R.addIndex<string, ReactElement>(R.map)((name, i) => (
        <Button
            key={i}
            basic
            disabled={tagName === name}
            onClick={() => dispatch(actions.updateData({
                id, type, meta: { tagName: name }, value,
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
                el={el}
                onChange={(latest) => {
                    dispatch(actions.updateData({
                        id, type, meta: { tagName }, value: latest,
                    }));
                }}
                onKeyLastReturn={() => {
                    dispatch(actions.updateCurrent({ id, focus: true, offset: 1 }));
                }}
            />
        </BrickHolder>
    );
};

export default Header;
