import React, { FunctionComponent } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { boolean } from '@storybook/addon-knobs';

import WallEditor from '../module/WallEditor';
import sampleText from './sampleText';
import wallDefine from './wallDefine';

const WallEditorApp: FunctionComponent<{}> = () => (
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
            {...wallDefine}
        />
    </Container>
);

export default WallEditorApp;
