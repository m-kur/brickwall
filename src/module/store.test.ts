import { factories, actions } from './store';
import { WallState } from './types';

const initialState: WallState = {
    editable: true,
    currentIndex: 0,
    wallData: [{
        type: 'header',
        value: 'first',
    }, {
        type: 'paragraph',
        value: 'second',
    }, {
        type: 'linkify',
        value: 'third',
    }],
    refugedData: [],
};

describe('reducers', () => {
    it('toggleEditableReducer', () => {
        const reducer = factories.toggleEditableReducer(initialState);
        const state1 = reducer(initialState, actions.toggleEditable());
        expect(state1.editable).toBeFalsy();
        const state2 = reducer(state1, actions.toggleEditable());
        expect(state2.editable).toBeTruthy();
    });

    it('updateCurrentReducer', () => {
        const reducer = factories.updateCurrentReducer(initialState);
        const state = reducer(initialState, actions.updateCurrent(2));
        expect(state.currentIndex).toBe(2);
    });

    it('moveUpReducer', () => {
        const reducer = factories.moveUpReducer(initialState);
        const state = reducer(initialState, actions.moveUp(1));
        expect(state.wallData.length).toBe(3);
        expect(state.wallData[0].value).toBe('second');
        expect(state.wallData[1].value).toBe('first');
        expect(state.wallData[2].value).toBe('third');
    });

    it('moveDownReducer', () => {
        const reducer = factories.moveDownReducer(initialState);
        const state = reducer(initialState, actions.moveDown(1));
        expect(state.wallData.length).toBe(3);
        expect(state.wallData[0].value).toBe('first');
        expect(state.wallData[1].value).toBe('third');
        expect(state.wallData[2].value).toBe('second');
    });

    it('updateReducer-append', () => {
        const reducer = factories.updateDataReducer(initialState);
        const state = reducer(initialState, actions.updateData({
            index: 3,
            data: {
                key: '',
                type: 'paragraph',
                meta: {},
                value: 'new',
            },
        }));
        expect(state.wallData.length).toBe(4);
        expect(state.wallData[3]).toEqual({
            key: expect.any(String),
            type: 'paragraph',
            meta: {},
            value: 'new',
        });
    });

    it('updateReducer-update', () => {
        const reducer = factories.updateDataReducer(initialState);
        const state = reducer(initialState, actions.updateData({
            index: 0,
            data: {
                key: '',
                type: 'paragraph',
                meta: {},
                value: 'update',
            },
        }));
        expect(state.wallData.length).toBe(3);
        expect(state.wallData[0]).toEqual({
            key: '',
            type: 'paragraph',
            meta: {},
            value: 'update',
        });
    });

    it('deleteReducer', () => {
        const reducer = factories.deleteDataReducer(initialState);
        const state = reducer(initialState, actions.deleteData(1));
        expect(state.wallData.length).toBe(2);
        expect(state.wallData[0].value).toBe('first');
        expect(state.wallData[1].value).toBe('third');
    });

    it('duplicateReducer', () => {
        const reducer = factories.duplicateDataReducer(initialState);
        const state = reducer(initialState, actions.duplicateData(1));
        expect(state.wallData.length).toBe(4);
        expect(state.wallData[1].value).toBe('second');
        expect(state.wallData[2].value).toBe('second');
    });

    it('refugeReducer', () => {
        const reducer = factories.refugeDataReducer(initialState);
        const state = reducer(initialState, actions.refugeData(1));
        expect(state.wallData.length).toBe(2);
        expect(state.wallData[0].value).toBe('first');
        expect(state.wallData[1].value).toBe('third');
        expect(state.refugedData.length).toBe(1);
        expect(state.refugedData[0].value).toBe('second');
    });
});
