import { action } from '@storybook/addon-actions';

import { BrickAction } from '../module/types';

export default (a: BrickAction) => action(`{ type: ${a.type}, payload: ${JSON.stringify(a.payload)} }`)();
