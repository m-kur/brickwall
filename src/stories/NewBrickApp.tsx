import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import NewBrick from '../module/NewBrick';
import WallStore from '../module/WallStore';
import printDispatch from './printDispatch';
import wallDefine from './wallDefine';

const NewBrickApp: FunctionComponent<{}> = () => (
    <WallStore.Provider
        initialState={{
            editable: boolean('editable', true),
            currentIndex: 0,
            wrappedDispatch: printDispatch,
        }}
    >
        <Container text>
            <Segment basic>
                <Header size="huge">NewBrick</Header>
            </Segment>
        </Container>
        <NewBrick index={0} {...wallDefine} />
    </WallStore.Provider>
);

export default NewBrickApp;
