import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
// import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HeaderBrick from '../brick/Header';
// import printDispatch from './printDispatch';

const NewBrickApp: FunctionComponent<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">Header</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <WallStore.Provider
            initialState={{
                editable: true,
                wallData: [{
                    type: 'header',
                    meta: { tagName: 'h2' },
                    value: 'ヘッダー2',
                }],
            }}
        >
            <HeaderBrick
                focused
                index={0}
            />
        </WallStore.Provider>
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <WallStore.Provider
            initialState={{
                editable: true,
                wallData: [{
                    type: 'header',
                    meta: { tagName: 'h4' },
                    value: 'ヘッダー4',
                }],
            }}
        >
            <HeaderBrick
                focused={false}
                index={0}
            />
        </WallStore.Provider>
    </Container>
);

export default NewBrickApp;
