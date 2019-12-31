import React, { ReactElement, FunctionComponent, CSSProperties, useState, useRef, useEffect } from 'react';
import * as R from 'ramda';

type InlineToolBoxProps = {
    tools: ReactElement;
    toolsWidth: number;
}
const InlineToolbox: FunctionComponent<InlineToolBoxProps> = (props) => {
    const [focused, setFocused] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
    const [popupAlign, setPopupAlign] = useState('left');
    const wrapRef = useRef<HTMLDivElement>(null);
    const { children, toolsWidth, tools } = props;

    const updatePopup = () => {
        if (focused) {
            const sel = document.getSelection();
            if (sel) {
                setPopupVisible(!sel.isCollapsed);
                if (popupVisible && wrapRef.current) {
                    const selRect = sel.getRangeAt(0).getBoundingClientRect();
                    const wrapRect = wrapRef.current.getBoundingClientRect();
                    const top = selRect.top - wrapRect.top + selRect.height;
                    const popupWidth = 1 + 8 + toolsWidth + 8 + 1;
                    // = border(1) + marginLeft(8) + toolsWidth + marginRight(8) + border(1)
                    const left = selRect.right - wrapRect.left - popupWidth;
                    if (left < 0) {
                        setPopupPos({ top, left: selRect.left - wrapRect.left });
                        setPopupAlign('left');
                    } else {
                        setPopupPos({ top, left });
                        setPopupAlign('right');
                    }
                }
                return;
            }
        }
        setPopupVisible(false);
    };

    useEffect(() => {
        window.addEventListener('resize', updatePopup);
        document.addEventListener('selectionchange', updatePopup);
        return () => {
            window.removeEventListener('resize', updatePopup);
            document.removeEventListener('selectionchange', updatePopup);
        };
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            ref={wrapRef}
            style={{ position: 'relative' }}
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            onDoubleClick={updatePopup}
            onKeyDown={(e) => {
                if (e.keyCode === 27) {
                    e.preventDefault();
                    setPopupVisible(false);
                    const sel = window.getSelection();
                    if (sel) {
                        sel.getRangeAt(0).collapse();
                    }
                }
            }}
        >
            <div style={{ position: 'static' }}>{children}</div>
            <div
                className={`ui popup ${popupVisible ? 'visible' : ''} bottom left ${popupAlign}`}
                style={R.mergeRight({ padding: 8, position: 'absolute' }, popupPos) as CSSProperties}
            >
                <div style={{ width: toolsWidth }}>
                    {tools}
                </div>
            </div>
        </div>
    );
};

export default InlineToolbox;
