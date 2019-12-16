import { action } from '@storybook/addon-actions';

import { BrickAction, BrickDispatch, WrappedDispatchFactory } from '../module/types';

const printDispath: WrappedDispatchFactory = (d: BrickDispatch) => (a: BrickAction) => {
    action(`{ type: ${a.type}, payload: ${JSON.stringify(a.payload)} }`)();
    d(a);
};

export default printDispath;
