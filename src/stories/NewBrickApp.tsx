import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Paragraph from '../brick/Paragraph';
import NewBrick from '../module/NewBrick';

const NewBrickApp: React.FC<{}> = () => (
    <Container text style={{ marginTop: 16, marginBottom: 16 }}>
        <Segment basic style={{ margin: 0 }}>
            <Header size="huge">NewBrick</Header>
        </Segment>
        <NewBrick
            editable={boolean('Editable', true)}
            currentIndex={0}
            wallData={[]}
            refugedData={[]}
            index={0}
            dispatch={({ type, payload }) => action(`{ type: ${type}, payload: ${JSON.stringify(payload)} }`)()}
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
    </Container>
);

export default NewBrickApp;
