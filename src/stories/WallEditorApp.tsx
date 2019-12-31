import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import WallEditor from '../module/WallEditor';
import sampleText from './sampleText';
import wallDefine from './wallDefine';
import printDispath from './printDispatch';

const WallEditorApp: FunctionComponent = () => (
    <WallStore.Provider
        initialState={{
            wallData: [{
                type: 'paragraph',
                value: sampleText,
            }],
            wrappedDispatch: printDispath,
        }}
    >
        <Container text>
            <Segment basic>
                <Header size="huge">WallEditor</Header>
            </Segment>
        </Container>
        <WallEditor {...wallDefine} editable={boolean('Editable', true)} />
    </WallStore.Provider>
);

export default WallEditorApp;
