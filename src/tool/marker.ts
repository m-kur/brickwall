import './marker.css';
import { searchParentNode, expandRange } from './toolUtils';
import { ToolDefine } from '../types';

const BRICK_WALL_MARKER = 'brick-wall-marker';

const marker: ToolDefine = {
    icon: 'edit',
    addFormat: (props) => {
        const { range } = props;
        const mark = document.createElement('mark');
        mark.classList.add(BRICK_WALL_MARKER);
        mark.appendChild(range.extractContents());
        document.execCommand('insertHTML', false, mark.outerHTML);
        return null;
    },
    removeFormat: () => {
        const range = expandRange(searchParentNode('mark', BRICK_WALL_MARKER));
        if (range) {
            const wrapper = document.createElement('div');
            wrapper.appendChild(range.extractContents());
            document.execCommand('insertHTML', false, wrapper.innerHTML);
        }
    },
    isFormatted: () => Boolean(searchParentNode('mark', BRICK_WALL_MARKER)),
};

export default marker;
