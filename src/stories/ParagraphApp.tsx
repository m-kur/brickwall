import React, { FunctionComponent } from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import Paragraph from '../brick/Paragraph';
import sampleText from './sampleText';
import printDispatch from './printDispatch';

const ParagraphApp: FunctionComponent<{}> = () => (
    <Container text>
        <WallStore.Provider
            initialState={{
                editable: boolean('editable', true),
                wallData: [{}, {
                    type: 'paragraph',
                    meta: { fontSize: 3 },
                    value: sampleText,
                }, {}],
                wrappedDispatch: printDispatch,
            }}
        >
            <Segment basic>
                <Header size="huge">Paragraph</Header>
            </Segment>
            <Segment basic>
                <Header size="small">Focused</Header>
            </Segment>
            <Paragraph
                focused
                index={1}
            />
            <Segment basic>
                <Button primary>Print Data</Button>
            </Segment>
            <Segment basic>
                <Header size="small">Unfocused</Header>
            </Segment>
            <Paragraph
                focused={false}
                index={1}
            />
        </WallStore.Provider>
    </Container>
);

export default ParagraphApp;
