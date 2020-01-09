import * as R from 'ramda';

export const searchParentNode = (name: string): Node|null => {
    const sel = window.getSelection();
    if (!sel) {
        throw new RangeError();
    }
    const search = R.until<Node|null, Node|null>(
        (node) => (node === null || node.nodeName.toLowerCase() === name),
        (node) => (node && node.parentNode),
    );
    return search(sel.anchorNode) || search(sel.focusNode);
};

export const expandRange = (node: Node|null) => {
    if (!node) {
        return;
    }
    const sel = window.getSelection();
    if (!sel) {
        throw new RangeError();
    }
    sel.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(node);
    sel.addRange(range);
};
