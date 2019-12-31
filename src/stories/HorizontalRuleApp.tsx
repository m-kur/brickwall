import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HorizontalRule from '../brick/HorizontalRule';
import printDispatch from './printDispatch';

const HorizontalRuleApp: FunctionComponent<{}> = () => (
    <WallStore.Provider
        initialState={{
            wallData: [{ id: 'xxxxxx', type: 'hr' }],
            currentBrick: 'xxxxxx',
            wrappedDispatch: printDispatch,
        }}
    >
        <Container text>
            <Segment basic>
                <Header size="huge">HorizontalRule</Header>
            </Segment>
        </Container>
        <HorizontalRule id="xxxxxx" editable={boolean('Editable', true)} />
    </WallStore.Provider>
);

export default HorizontalRuleApp;
