import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import HeaderApp from './HeaderApp';
import HorizontalRuleApp from './HorizontalRuleApp';
import NewBrickApp from './NewBrickApp';
import ParagraphApp from './ParagraphApp';
import WallEditorApp from './WallEditorApp';

export default {
    title: 'BrickWall',
    decorators: [withKnobs],
};

export const wallEditor = (): JSX.Element => <WallEditorApp />;
export const newBrick = (): JSX.Element => <NewBrickApp />;
export const headerApp = (): JSX.Element => <HeaderApp />;
export const horizontalRuleApp = (): JSX.Element => <HorizontalRuleApp />;
export const paragraph = (): JSX.Element => <ParagraphApp />;
