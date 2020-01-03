import React from 'react';
import { Input } from 'semantic-ui-react';

import { ToolDefine } from '../types';

const linkify: ToolDefine = {
    icon: 'linkify',
    addFormat: (ref) => (
        <Input ref={ref} fluid action={{ icon: 'linkify' }} />
    ),
    removeFormat: () => {},
    isFormatted: () => false,
};

export default linkify;
