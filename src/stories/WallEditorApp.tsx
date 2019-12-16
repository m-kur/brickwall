import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import WallEditor from '../module/WallEditor';
import sampleText from './sampleText';
import wallDefine from './wallDefine';
import printDispath from './printDispatch';

const WallEditorApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">WallEditor</Header>
        </Segment>
        <WallStore.Provider
            initialState={{
                editable: boolean('Editable', true),
                wallData: [{
                    type: 'paragraph',
                    value: sampleText,
                }],
                wrappedDispatch: printDispath,
            }}
        >
            <WallEditor {...wallDefine} />
        </WallStore.Provider>
    </Container>
);

export default WallEditorApp;
