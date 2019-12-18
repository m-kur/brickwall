import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallStore from '../module/WallStore';
import HeaderBrick from '../brick/Header';
import printDispatch from './printDispatch';

const HeaderApp: FunctionComponent<{}> = () => (
    <Container text>
        <WallStore.Provider
            initialState={{
                editable: boolean('editable', true),
                wallData: [{ type: 'header', meta: { tagName: 'h2' }, value: 'ヘッダー2' }],
                currentIndex: 0,
                wrappedDispatch: printDispatch,
            }}
        >
            <Segment basic>
                <Header size="huge">Header</Header>
            </Segment>
            <HeaderBrick index={0} />
        </WallStore.Provider>
    </Container>
);

export default HeaderApp;
