import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HorizontalRule from '../brick/HorizontalRule';
import printDispatch from './printDispatch';

const HorizontalRuleApp: FunctionComponent<{}> = () => (
    <WallStore.Provider
        initialState={{
            editable: boolean('editable', true),
            wallData: [{ type: 'hr' }],
            currentIndex: 0,
            wrappedDispatch: printDispatch,
        }}
    >
        <Container text>
            <Segment basic>
                <Header size="huge">HorizontalRule</Header>
            </Segment>
        </Container>
        <HorizontalRule index={0} />
    </WallStore.Provider>
);

export default HorizontalRuleApp;
