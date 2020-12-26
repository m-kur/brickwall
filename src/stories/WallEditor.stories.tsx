import 'semantic-ui-css/semantic.min.css';
import React from 'react';

import WallStore from '../module/WallStore';
import WallEditor from '../module/WallEditor';
import Paragraph from '../brick/Paragraph';
import Header from '../brick/Header';
import List from '../brick/List';
import BlockQuote from '../brick/BlockQuote';
import HorizontalRule from '../brick/HorizontalRule';
import printDispath from './printDispatch';

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum. 色は匂へど 散りぬるを 我が世誰ぞ 常ならむ
有為の奥山 今日越えて 浅き夢見じ 酔ひもせず`;

export const wallEditor = (args: { editable: boolean }): JSX.Element => (
    <WallStore.Provider
        initialState={{
            wallData: [{
                type: 'header',
                meta: { tagName: 'h2' },
                value: 'BrickWall Demo',
            }, {
                type: 'hr',
            }, {
                type: 'paragraph',
                value: sampleText,
            }],
            wrappedDispatch: printDispath,
        }}
    >
        <WallEditor
            brickDefines={{
                paragraph: { icon: 'paragraph', brick: Paragraph },
                header: { icon: 'header', brick: Header },
                list: { icon: 'unordered list', brick: List },
                quote: { icon: 'quote left', brick: BlockQuote },
                hr: { icon: 'minus', brick: HorizontalRule, empty: true },
                image: { icon: 'file image', brick: Paragraph },
                link: { icon: 'linkify', brick: Paragraph },
                table: { icon: 'table', brick: Paragraph },
            }}
            defaultBrickType="paragraph"
            editable={args.editable}
        />
    </WallStore.Provider>
);

export default {
    title: 'BrickWall',
    argTypes: {
        editable: { control: 'boolean' },
    },
    args: {
        editable: true,
    },
    parameters: {
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
    },
};
