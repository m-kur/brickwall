import * as R from 'ramda';

export const searchParentNode = (name: string, className?: string): Node|null => {
    const sel = window.getSelection();
    if (!sel) {
        throw new RangeError();
    }
    const search = R.until<Node|null, Node|null>(
        (node) => {
            if (node === null) {
                return true;
            }
            if (node.nodeName.toLowerCase() === name.toLowerCase()) {
                if (className && node instanceof HTMLElement) {
                    return (node as HTMLElement).classList.contains(className);
                }
                return true;
            }
            return false;
        },
        (node) => (node && node.parentNode),
    );
    return search(sel.anchorNode) || search(sel.focusNode);
};

export const expandRange = (node: Node|null): Range|null => {
    if (!node) {
        return null;
    }
    const sel = window.getSelection();
    if (!sel) {
        throw new RangeError();
    }
    sel.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(node);
    sel.addRange(range);
    return range;
};
