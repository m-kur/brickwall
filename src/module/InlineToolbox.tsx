import React, { ReactElement, FunctionComponent, CSSProperties, useState, useRef, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import { ToolDefine } from '../types';

type InlineToolBoxProps = {
    editable: boolean;
    toolDefines: Record<string, ToolDefine>;
}
const InlineToolbox: FunctionComponent<InlineToolBoxProps> = (props) => {
    const { editable, children, toolDefines } = props;
    const toolsWidth = R.length(R.keys(toolDefines)) * 42 + 1;
    const [focused, setFocused] = useState(false);
    const [popupVisible, _setPopupVisible] = useState(false);
    const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
    const [popupAlign, setPopupAlign] = useState('left');
    const [toolState, setToolState] = useState<Record<string, boolean>>({});
    const wrapRef = useRef<HTMLDivElement>(null);
    const [toolEx, setToolEx] = useState<ReactElement|null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exRef = useRef<any>(null);
    // const [currentRange, setCurrentRange] = useState<Range|null>(null);

    const setPopupVisible = (visible: boolean) => {
        if (visible) {
            /*
            const sel = window.getSelection();
            if (sel && sel.rangeCount) {
                setCurrentRange(sel.getRangeAt(0));
            }
            */
        } else {
            /*
            if (currentRange) {
                const sel = window.getSelection();
                if (sel) {
                    sel.removeAllRanges();
                    sel.addRange(currentRange);
                }
                setCurrentRange(null);
            }
            */
        }
        if (!visible && toolEx) {
            setToolEx(null);
            exRef.current = null;
        }
        _setPopupVisible(visible);
    };

    const updatePopup = () => {
        if (popupVisible && toolEx) {
            return;
        }
        if (editable && focused) {
            const sel = document.getSelection();
            if (sel) {
                setPopupVisible(!sel.isCollapsed);
                if (popupVisible && wrapRef.current) {
                    setToolState(R.mapObjIndexed(
                        (define) => Boolean(define.isFormatted && define.isFormatted()),
                        toolDefines,
                    ));
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

    useEffect(() => {
        if (popupVisible && toolEx && exRef.current && exRef.current.focus) {
            exRef.current.focus();
        }
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
                    const sel = document.getSelection();
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
                <div
                    onBlur={() => setPopupVisible(false)}
                    style={{ width: toolsWidth }}
                >
                    {toolEx || R.map(
                        (type) => {
                            const define = R.prop(type, toolDefines);
                            const formatted = R.prop(type, toolState);
                            return (
                                <Button
                                    key={type}
                                    basic={!formatted}
                                    icon={define.icon}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (formatted && define.removeFormat) {
                                            define.removeFormat();
                                        } else {
                                            const el = define.addFormat(exRef);
                                            setToolEx(el);
                                            if (el) {
                                                return;
                                            }
                                        }
                                        const sel = document.getSelection();
                                        if (sel) {
                                            const mode = sel.focusOffset < sel.anchorOffset;
                                            sel.getRangeAt(0).collapse(mode);
                                        }
                                    }}
                                />
                            );
                        },
                        R.keys(toolDefines),
                    )}
                </div>
            </div>
        </div>
    );
};

export default InlineToolbox;
