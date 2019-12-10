import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import HorizontalRule from '../brick/HorizontalRule';
import printDispatch from './printDispatch';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">HorizontalRule</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <HorizontalRule
            editable={boolean('Editable', true)}
            focused
            hasNext
            index={0}
            key=""
            type=""
            meta={{}}
            value=""
            dispatch={printDispatch}
        />
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <HorizontalRule
            editable={boolean('Editable', true)}
            focused={false}
            hasNext
            index={0}
            key=""
            type=""
            meta={{}}
            value=""
            dispatch={printDispatch}
        />
    </Container>
);

export default NewBrickApp;
