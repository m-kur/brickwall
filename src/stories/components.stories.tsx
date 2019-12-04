import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import ParagraphApp from './ParagraphApp';
import NewBrickApp from './NewBrickApp';
import WallEditorApp from './WallEditorApp';

export default {
    title: 'Components',
    decorators: [withKnobs],
};

export const paragraph = (): React.ReactElement => <ParagraphApp />;
export const newBrick = (): React.ReactElement => <NewBrickApp />;
export const wallEditor = (): React.ReactElement => <WallEditorApp />;
