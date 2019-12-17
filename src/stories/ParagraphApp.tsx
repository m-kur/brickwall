import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import Paragraph from '../brick/Paragraph';
import printDispatch from './printDispatch';
import sampleText from './sampleText';

const ParagraphApp: FunctionComponent<{}> = () => (
    <Container text>
        <WallStore.Provider
            initialState={{
                editable: boolean('editable', true),
                wallData: [{
                    type: 'paragraph',
                    meta: { fontSize: 3 },
                    value: sampleText,
                }],
                currentIndex: 0,
                wrappedDispatch: printDispatch,
            }}
        >
            <Segment basic>
                <Header size="huge">Paragraph</Header>
            </Segment>
            <Paragraph index={0} />
        </WallStore.Provider>
    </Container>
);

export default ParagraphApp;
