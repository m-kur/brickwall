import React, { FunctionComponent, useState } from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Paragraph from '../brick/Paragraph';
import sampleText from './sampleText';
import printDispatch from './printDispatch';

const ParagraphApp: FunctionComponent<{}> = () => {
    const [message, setMessage] = useState(sampleText);
    return (
        <Container text>
            <Segment basic>
                <Header size="huge">Paragraph</Header>
            </Segment>
            <Segment basic>
                <Header size="small">Focused</Header>
            </Segment>
            <Paragraph
                editable={boolean('Editable', true)}
                currentIndex={0}
                wallData={[]}
                refugedData={[]}
                index={0}
                type="paragraph"
                value={message}
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
            <Segment basic>
                <Button primary onClick={action(message)}>Print Data</Button>
            </Segment>
            <Segment basic>
                <Header size="small">Unfocused</Header>
            </Segment>
            <Paragraph
                editable
                currentIndex={1}
                wallData={[]}
                refugedData={[]}
                index={0}
                type="paragraph"
                value={message}
                dispatch={printDispatch}
            />
        </Container>
    );
};

export default ParagraphApp;
