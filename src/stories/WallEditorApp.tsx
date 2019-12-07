import React, { FC } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallEditor from '../module/WallEditor';
import Paragraph from '../brick/Paragraph';
import HorizontalRule from '../brick/HorizontalRule';
import sampleText from './sampleText';

const WallEditorApp: FC<{}> = () => (
    <Container text>
        <Segment basic>
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
                    brick: HorizontalRule,
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
