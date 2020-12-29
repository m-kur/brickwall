import React, { PropsWithChildren, CSSProperties, useState, useRef, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import * as R from 'ramda';

import { ToolDefine } from '../types';

type InlineToolBoxProps = {
    editable: boolean;
    focused: boolean;
    toolDefines: Record<string, ToolDefine>;
}
function InlineToolbox(props: PropsWithChildren<InlineToolBoxProps>): JSX.Element {
    const { editable, focused, children, toolDefines } = props;
    // SPEC: Popupの矩形幅を決める
    const toolsWidth = R.length(R.keys(toolDefines)) * 42 + 1;
    const popupWidth = 1 + 8 + toolsWidth + 8 + 1;
    // = border(1) + marginLeft(8) + toolsWidth + marginRight(8) + border(1)

    const [popupVisible, _setPopupVisible] = useState(false);
    const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
    const [popupAlign, setPopupAlign] = useState('left');
    const [toolState, setToolState] = useState<Record<string, boolean>>({});
    const wrapEl = useRef<HTMLDivElement>(null);
    const [toolEx, setToolEx] = useState<JSX.Element|null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exEl = useRef<any>(null);
    const [currentRange, setCurrentRange] = useState<Range|null>(null);
    const [format, setFormat] = useState<(() => void)|undefined>(undefined);

    const collapse = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount) {
            const mode = sel.focusOffset < sel.anchorOffset;
            sel.getRangeAt(0).collapse(mode);
        }
    };

    const saveRange = (): Range => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount) {
            const range = sel.getRangeAt(0);
            setCurrentRange(range);
            return range;
        }
        throw new RangeError();
    };

    const restoreRange = (): Range|null => {
        if (currentRange) {
            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(currentRange);
                setCurrentRange(null);
                return sel.getRangeAt(0);
            }
        }
        return null;
    };

    const setPopupVisible = (visible: boolean) => {
        _setPopupVisible(visible);
        if (!visible) {
            setToolEx(null);
            exEl.current = null;
        }
    };

    useEffect(() => {
        // SPEC: Toolの拡張ELにフォーカスを当てる(2)
        if (popupVisible && toolEx && exEl.current && exEl.current.focus) {
            exEl.current.focus();
        }
    });

    useEffect(() => {
        // SPEC: Toolの拡張コントロールを表示した後、フォーマット処理
        if (format) {
            restoreRange();
            format();
            setFormat(undefined);
            collapse();
        }
    });

    const updatePopup = () => {
        if (popupVisible && toolEx) {
            return;
        }
        if (editable && focused) {
            const sel = window.getSelection();
            if (sel) {
                // SPEC: PopUpを出したり消したりする
                const visible = !sel.isCollapsed;
                setPopupVisible(visible);
                if (visible && wrapEl.current) {
                    // SPEC: Toolそれぞれの状態を取得する
                    setToolState(R.mapObjIndexed(
                        (define) => Boolean(define.isFormatted && define.isFormatted()),
                        toolDefines,
                    ));
                    // SPEC: PopUpの表示場所を計算する
                    const selRect = sel.getRangeAt(0).getBoundingClientRect();
                    const wrapRect = wrapEl.current.getBoundingClientRect();
                    const top = selRect.top - wrapRect.top + selRect.height;
                    const left = selRect.right - wrapRect.left - popupWidth;
                    if (left < 0) {
                        setPopupPos({ top, left: selRect.left - wrapRect.left });
                        setPopupAlign('left');
                    } else {
                        setPopupPos({ top, left });
                        setPopupAlign('right');
                    }
                }
            }
        }
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
            ref={wrapEl}
            style={{ position: 'relative' }}
            onDoubleClick={updatePopup}
            onKeyDown={(e) => {
                if (e.keyCode === 27) {
                    // SPEC: ESCキー押し下げでPopupを閉じる
                    e.preventDefault();
                    setPopupVisible(false);
                    collapse();
                }
            }}
        >
            <div style={{ position: 'static' }}>{children}</div>
            <div
                className={`ui popup ${popupVisible ? 'visible' : ''} bottom left ${popupAlign}`}
                style={R.mergeRight({ padding: 8, position: 'absolute' }, popupPos) as CSSProperties}
            >
                <div
                    style={{ width: toolsWidth }}
                    onBlur={() => setPopupVisible(false)}
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
                                            // SPEC: フォーマットを解除する
                                            define.removeFormat();
                                            collapse();
                                            return;
                                        }
                                        // SPEC: フォーマットをあてる or 拡張コントロールを表示する
                                        const range = saveRange();
                                        const extention = define.addFormat({
                                            el: exEl,
                                            range,
                                            width: toolsWidth,
                                            close: (formatter) => {
                                                // SPEC: フォーマット呼び出しを遅延させる
                                                setFormat(() => formatter);
                                                // SPEC: フォーマットしない時には代わりにここでフォーカスを直す
                                                if (!formatter) {
                                                    restoreRange();
                                                    collapse();
                                                }
                                                setPopupVisible(false);
                                            },
                                        });
                                        // SPEC: Toolの拡張ELにフォーカスを当てる(1)
                                        setToolEx(extention);
                                        if (!extention) {
                                            collapse();
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
}

export default InlineToolbox;
