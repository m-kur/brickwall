import Paragraph from '../brick/Paragraph';
import HorizontalRule from '../brick/HorizontalRule';

export default {
    brickDefines: {
        paragraph: {
            icon: 'paragraph',
            brick: Paragraph,
        },
        header: {
            icon: 'header',
            brick: Paragraph,
        },
        list: {
            icon: 'unordered list',
            brick: Paragraph,
        },
        quote: {
            icon: 'quote left',
            brick: Paragraph,
        },
        hr: {
            icon: 'minus',
            brick: HorizontalRule,
            empty: true,
        },
        image: {
            icon: 'file image',
            brick: Paragraph,
        },
        link: {
            icon: 'linkify',
            brick: Paragraph,
        },
        table: {
            icon: 'table',
            brick: Paragraph,
        },
    },
    defaultBrickType: 'paragraph',
};
