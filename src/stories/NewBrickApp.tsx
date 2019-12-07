import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import NewBrick from '../module/NewBrick';
import printDispatch from './printDispatch';
import wallDefine from './wallDefine';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">NewBrick</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <NewBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={0}
            dispatch={printDispatch}
            {...wallDefine}
        />
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <NewBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={1}
            dispatch={printDispatch}
            {...wallDefine}
        />
    </Container>
);

export default NewBrickApp;
