import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import ParagraphApp from './ParagraphApp';
import HorizontalRuleApp from './HorizontalRuleApp';
import HeaderApp from './HeaderApp';
import NewBrickApp from './NewBrickApp';
import WallEditorApp from './WallEditorApp';

export default {
    title: 'Components',
    decorators: [withKnobs],
};

export const paragraph = () => <ParagraphApp />;
export const horizontalRuleApp = () => <HorizontalRuleApp />;
export const headerApp = () => <HeaderApp />;
export const newBrick = () => <NewBrickApp />;
export const wallEditor = () => <WallEditorApp />;
