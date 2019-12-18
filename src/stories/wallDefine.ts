import Paragraph from '../brick/Paragraph';
import Header from '../brick/Header';
import List from '../brick/List';
import BlockQuote from '../brick/BlockQuote';
import HorizontalRule from '../brick/HorizontalRule';

export default {
    brickDefines: {
        paragraph: { icon: 'paragraph', brick: Paragraph },
        header: { icon: 'header', brick: Header },
        list: { icon: 'unordered list', brick: List },
        quote: { icon: 'quote left', brick: BlockQuote },
        hr: { icon: 'minus', brick: HorizontalRule, empty: true },
        image: { icon: 'file image', brick: Paragraph },
        link: { icon: 'linkify', brick: Paragraph },
        table: { icon: 'table', brick: Paragraph },
    },
    defaultBrickType: 'paragraph',
};
