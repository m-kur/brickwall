import React, { FunctionComponent } from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
// import { action } from '@storybook/addon-actions';
// import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import Paragraph from '../brick/Paragraph';
import sampleText from './sampleText';
// import printDispatch from './printDispatch';

const ParagraphApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">Paragraph</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <WallStore.Provider
            initialState={{
                editable: true,
                wallData: [{
                    type: 'paragraph',
                    value: sampleText,
                }],
                refugedData: [],
                currentIndex: 0,
            }}
        >
            <Paragraph
                focused
                hasNext
                index={0}
            />
            <Segment basic>
                <Button primary>Print Data</Button>
            </Segment>
        </WallStore.Provider>
        <Segment basic>
            <Header size="small">Unfocused FontSize+1</Header>
        </Segment>
        <WallStore.Provider
            initialState={{
                editable: true,
                wallData: [{
                    type: 'paragraph',
                    value: sampleText,
                }],
                refugedData: [],
                currentIndex: 0,
            }}
        >
            <Paragraph
                focused={false}
                hasNext
                index={0}
            />
        </WallStore.Provider>
    </Container>
);

export default ParagraphApp;
