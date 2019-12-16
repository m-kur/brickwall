import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
// import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import NewBrick from '../module/NewBrick';
// import printDispatch from './printDispatch';
import wallDefine from './wallDefine';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">NewBrick</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>

        <WallStore.Provider>
            <NewBrick
                focused
                index={0}
                {...wallDefine}
            />
        </WallStore.Provider>
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <WallStore.Provider>
            <NewBrick
                focused={false}
                index={0}
                {...wallDefine}
            />
        </WallStore.Provider>
    </Container>
);

export default NewBrickApp;
