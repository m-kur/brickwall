import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
// import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HorizontalRule from '../brick/HorizontalRule';
// import printDispatch from './printDispatch';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">HorizontalRule</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <WallStore.Provider>
            <HorizontalRule
                focused
                index={0}
            />
        </WallStore.Provider>
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <WallStore.Provider>
            <HorizontalRule
                focused={false}
                index={0}
            />
        </WallStore.Provider>
    </Container>
);

export default NewBrickApp;
