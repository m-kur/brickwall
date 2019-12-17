import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import HeaderApp from './HeaderApp';
import HorizontalRuleApp from './HorizontalRuleApp';
import NewBrickApp from './NewBrickApp';
import ParagraphApp from './ParagraphApp';
import WallEditorApp from './WallEditorApp';

export default {
    title: 'Components',
    decorators: [withKnobs],
};

export const wallEditor = () => <WallEditorApp />;
export const newBrick = () => <NewBrickApp />;
export const headerApp = () => <HeaderApp />;
export const horizontalRuleApp = () => <HorizontalRuleApp />;
export const paragraph = () => <ParagraphApp />;
