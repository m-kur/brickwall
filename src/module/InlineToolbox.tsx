import React from 'react';
import * as R from 'ramda';

type InlineToolBoxProps = {
    tools: React.ReactElement;
    toolsWidth: number;
}

const InlineToolbox: React.FC<InlineToolBoxProps> = (props) => {
    const [focused, setFocused] = React.useState(false);
    const [popupVisible, setPopupVisible] = React.useState(false);
    const [popupPos, setPopupPos] = React.useState({ top: 0, left: 0 });
    const [popupAlign, setPopupAlign] = React.useState('left');
    const wrapRef = React.useRef<HTMLDivElement>(null);

    const updatePopup = () => {
        if(focused) {
            const sel = document.getSelection();
            if (sel) {
                setPopupVisible(!sel.isCollapsed);
                if (popupVisible && wrapRef.current) {
                    const selRect = sel.getRangeAt(0).getBoundingClientRect();
                    const wrapRect = wrapRef.current.getBoundingClientRect();
                    const top = selRect.top - wrapRect.top + selRect.height;
                    const popupWidth = 1 + 8 + props.toolsWidth + 8 + 1;
                    // = border(1) + marginLeft(8) + props.toolsWidth + marginRight(8) + border(1)
                    const left = selRect.right - wrapRect.left - popupWidth;
                    if (left < 0) {
                        setPopupPos({ top, left: selRect.left - wrapRect.left }); ;
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

    React.useEffect(() => {
        window.addEventListener('resize', updatePopup);
        document.addEventListener('selectionchange', updatePopup);
        return () => {
            window.removeEventListener('resize', updatePopup);
            document.removeEventListener('selectionchange', updatePopup);
        };
    });

    return (
        <div
            ref={wrapRef}
            style={{ position: 'relative' }}
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            onDoubleClick={updatePopup}
        >
            {props.children}
            <div
                className={`ui popup ${popupVisible ? 'visible' : ''} bottom left ${popupAlign}`}
                style={R.mergeRight({ padding: 8, position: 'absolute' }, popupPos)}
            >
                <div style={{ width: props.toolsWidth }}>
                    {props.tools}
                </div>
            </div>
        </div>
    );
}

export default InlineToolbox;
