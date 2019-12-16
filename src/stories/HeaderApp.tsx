import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HeaderBrick from '../brick/Header';
import printDispatch from './printDispatch';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <WallStore.Provider
            initialState={{
                editable: boolean('editable', true),
                wallData: [{}, {
                    type: 'header',
                    meta: { tagName: 'h2' },
                    value: 'ヘッダー2',
                }, {}],
                wrappedDispatch: printDispatch,
            }}
        >
            <Segment basic>
                <Header size="huge">Header</Header>
            </Segment>
            <Segment basic>
                <Header size="small">Focused</Header>
            </Segment>
            <HeaderBrick
                focused
                index={1}
            />
            <Segment basic>
                <Header size="small">Unfocused</Header>
            </Segment>
            <HeaderBrick
                focused={false}
                index={1}
            />
        </WallStore.Provider>
    </Container>
);

export default NewBrickApp;
