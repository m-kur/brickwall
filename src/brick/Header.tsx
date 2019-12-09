import React, { Fragment, FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';

import BrickHolder from '../module/BrickHolder';
import ContentEditable from '../module/ContentEditable';
import { actions } from '../module/store';
import { BrickProps } from '../module/types';

const Header: FunctionComponent<BrickProps> = (props) => {
    const { editable, currentIndex, index, type, value, dispatch } = props;
    const focused = currentIndex === index;

    return (
        <BrickHolder
            {...props}
            options={(
                <Fragment>
                    {/* TODO: オプションボタンの実装 */}
                    <Button basic>h1</Button>
                    <Button basic>h2</Button>
                    <Button basic>h3</Button>
                    <Button basic>h4</Button>
                </Fragment>
            )}
        >
            <ContentEditable
                tagName="h1"
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
