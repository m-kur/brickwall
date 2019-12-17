import { useState, RefObject } from 'react';
import { createContainer } from 'unstated-next';

const useFocusControll = (initialState?: boolean) => {
    const initialValue = Boolean(initialState);
    return useState(initialValue);
};

export default createContainer(useFocusControll);
