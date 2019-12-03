import { configure, addParameters } from '@storybook/react';

addParameters({
    viewport: {
        viewports: {
            iPhone8: {
                name: 'iPhone 8',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                },
            iPadAir2: {
                name: 'iPad Air 2',
                styles: {
                    width: '768px',
                    height: '1024px',
                },
            },
        },
    },
});

configure(require.context('../src/stories', true, /\.stories\.tsx?$/), module);
