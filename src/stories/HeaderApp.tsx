import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HeaderBrick from '../brick/Header';
import printDispatch from './printDispatch';

const HeaderApp: FunctionComponent<{}> = () => (
    <WallStore.Provider
        initialState={{
            editable: boolean('editable', true),
            wallData: [{ type: 'header', meta: { tagName: 'h2' }, value: 'ヘッダー2' }],
            currentIndex: 0,
            wrappedDispatch: printDispatch,
        }}
    >
        <Container text>
            <Segment basic>
                <Header size="huge">Header</Header>
            </Segment>
        </Container>
        <HeaderBrick index={0} />
    </WallStore.Provider>
);

export default HeaderApp;
