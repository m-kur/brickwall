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
                focused
                hasNext
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
                id="1"
                type="paragraph"
                meta={{}}
                value={message}
            />
            <Segment basic>
                <Button primary onClick={action(message)}>Print Data</Button>
            </Segment>
            <Segment basic>
                <Header size="small">Unfocused FontSize+1</Header>
            </Segment>
            <Paragraph
                editable
                focused={false}
                hasNext
                index={0}
                dispatch={printDispatch}
                id="2"
                type="paragraph"
                meta={{ fontSize: 3 }}
                value={message}
            />
        </Container>
    );
};

export default ParagraphApp;
