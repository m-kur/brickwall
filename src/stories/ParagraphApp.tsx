import React, { FC, useState } from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Paragraph from '../brick/Paragraph';
import sampleText from './sampleText';

const ParagraphApp: FC<{}> = () => {
    const [message, setMessage] = useState(sampleText);
    return (
        <Container text style={{ marginTop: 16, marginBottom: 16 }}>
            <Segment basic style={{ margin: 0 }}>
                <Header size="huge">Paragraph</Header>
            </Segment>
            <Paragraph
                editable={boolean('Editable', true)}
                currentIndex={0}
                wallData={[{
                    type: 'paragraph',
                    value: message,
                }]}
                refugedData={[]}
                index={0}
                dispatch={({ type, payload }) => {
                    if (type === 'UPDATE') {
                        setMessage(payload.data.value);
                        return;
                    }
                    if (type !== 'UPDATE_CURRENT') {
                        action(`{ type: ${type}, payload: ${JSON.stringify(payload)} }`)();
                    }
                }}
            />
            <Button primary onClick={action(message)} style={{ margin: 16 }}>Print Data</Button>
        </Container>
    );
};

export default ParagraphApp;
