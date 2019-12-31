import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import Paragraph from '../brick/Paragraph';
import printDispatch from './printDispatch';
import sampleText from './sampleText';

const ParagraphApp: FunctionComponent<{}> = () => (
    <WallStore.Provider
        initialState={{
            wallData: [{ id: 'xxxxxx', type: 'paragraph', meta: { fontSize: 3 }, value: sampleText }],
            currentBrick: 'xxxxxx',
            wrappedDispatch: printDispatch,
        }}
    >
        <Container text>
            <Segment basic>
                <Header size="huge">Paragraph</Header>
            </Segment>
        </Container>
        <Paragraph id="xxxxxx" editable={boolean('Editable', true)} />
    </WallStore.Provider>
);

export default ParagraphApp;
