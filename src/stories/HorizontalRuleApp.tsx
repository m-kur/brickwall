import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HorizontalRule from '../brick/HorizontalRule';
import printDispatch from './printDispatch';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <WallStore.Provider
            initialState={{
                editable: boolean('editable', true),
                wallData: [{}, {
                    type: 'hr',
                }, {}],
                wrappedDispatch: printDispatch,
            }}
        >
            <Segment basic>
                <Header size="huge">HorizontalRule</Header>
            </Segment>
            <Segment basic>
                <Header size="small">Focused</Header>
            </Segment>
            <HorizontalRule
                focused
                index={1}
            />
            <Segment basic>
                <Header size="small">Unfocused</Header>
            </Segment>
            <HorizontalRule
                focused={false}
                index={1}
            />
        </WallStore.Provider>
    </Container>
);

export default NewBrickApp;
