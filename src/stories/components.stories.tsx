import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import ParagraphApp from './ParagraphApp';
import HorizontalRuleApp from './HorizontalRuleApp';
import NewBrickApp from './NewBrickApp';
import WallEditorApp from './WallEditorApp';

export default {
    title: 'Components',
    decorators: [withKnobs],
};

export const paragraph = () => <ParagraphApp />;
export const horizontalRuleApp = () => <HorizontalRuleApp />;
export const newBrick = () => <NewBrickApp />;
export const wallEditor = () => <WallEditorApp />;
