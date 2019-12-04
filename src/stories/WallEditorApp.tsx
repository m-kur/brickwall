import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallEditor from '../module/WallEditor';
import Paragraph from '../brick/Paragraph';
import sampleText from './sampleText';

const WallEditorApp: React.FC<{}> = () => (
    <Container text style={{ marginTop: 16, marginBottom: 16 }}>
        <Segment basic style={{ margin: 0 }}>
            <Header size="huge">WallEditor</Header>
        </Segment>
        <WallEditor
            editable={boolean('Editable', true)}
            currentIndex={-1}
            wallData={[{
                type: 'paragraph',
                value: sampleText,
            }]}
            refugedData={[]}
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

export default WallEditorApp;
