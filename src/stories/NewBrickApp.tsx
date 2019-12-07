import React, { FC } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Paragraph from '../brick/Paragraph';
import NewBrick from '../module/NewBrick';
import printDispatch from './printDispatch';

const NewBrickApp: FC<{}> = () => (
    <Container text>
        <Segment basic>
            <Header size="huge">NewBrick</Header>
        </Segment>
        <Segment basic>
            <Header size="small">Focused</Header>
        </Segment>
        <NewBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={0}
            dispatch={printDispatch}
            brickDefines={{
                paragraph: {
                    icon: 'paragraph',
                    brick: Paragraph,
                },
                header: {
                    icon: 'header',
                    brick: Paragraph,
                },
                list: {
                    icon: 'unordered list',
                    brick: Paragraph,
                },
                quote: {
                    icon: 'quote left',
                    brick: Paragraph,
                },
                hr: {
                    icon: 'minus',
                    brick: Paragraph,
                },
                image: {
                    icon: 'file image',
                    brick: Paragraph,
                },
                link: {
                    icon: 'linkify',
                    brick: Paragraph,
                },
                table: {
                    icon: 'table',
                    brick: Paragraph,
                },
            }}
            defaultBrickType="paragraph"
        />
        <Segment basic>
            <Header size="small">Unfocused</Header>
        </Segment>
        <NewBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={1}
            dispatch={printDispatch}
            brickDefines={{
                paragraph: {
                    icon: 'paragraph',
                    brick: Paragraph,
                },
            }}
            defaultBrickType="paragraph"
        />
    </Container>
);

export default NewBrickApp;
