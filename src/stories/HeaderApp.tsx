import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import HeaderBrick from '../brick/Header';
import printDispatch from './printDispatch';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">Header</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <HeaderBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={0}
            type=""
            meta={{ tagName: 'h2' }}
            value="Header h2"
            dispatch={printDispatch}
        />
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <HeaderBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={1}
            type=""
            meta={{ tagName: 'h3' }}
            value="Header h3"
            dispatch={printDispatch}
        />
    </Container>
);

export default NewBrickApp;
