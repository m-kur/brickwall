import React from 'react';

import { searchParentNode, expandRange } from './toolUtils';
import { ToolDefine } from '../types';
import ContentEditable from '../module/ContentEditable';

const linkify: ToolDefine = {
    icon: 'linkify',
    addFormat: (props) => {
        const { el, width, close } = props;
        return (
            <ContentEditable
                el={el}
                editable
                html=""
                style={{ width, marginTop: 8, marginBottom: 9 }}
                onChange={() => {}}
                onKeyFirstDelete={close}
                onKeyLastReturn={(latest) => {
                    const url = latest.trim();
                    if (url.length === 0) {
                        return;
                    }
                    close(() => {
                        expandRange(searchParentNode('a'));
                        document.execCommand('createLink', false, url);
                    });
                }}
            />
        );
    },
    removeFormat: () => {
        expandRange(searchParentNode('a'));
        document.execCommand('unlink');
    },
    isFormatted: () => searchParentNode('a') !== null,
};

export default linkify;
