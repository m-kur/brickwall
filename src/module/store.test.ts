import { factories, actions } from './store';
import { WallState } from '../types';

const initialState: WallState = {
    currentBrick: '',
    shouldAdjustFocus: false,
    wallData: [
        { id: 'XXX1XX', type: 'header', meta: {}, value: 'first' },
        { id: 'XXX2XX', type: 'paragraph', meta: {}, value: 'second' },
        { id: 'XXX3XX', type: 'linkify', meta: {}, value: 'third' },
    ],
    refugedData: [],
};

describe('reducers', () => {
    it('updateCurrentReducer', () => {
        const reducer1 = factories.updateCurrentReducer(initialState);
        const state1 = reducer1(initialState, actions.updateCurrent({ id: 'XXX3XX', focus: true, offset: 0 }));
        expect(state1.currentBrick).toBe('XXX3XX');
        expect(state1.shouldAdjustFocus).toBeTruthy();
        const reducer2 = factories.confirmFocusChangeReducer(state1);
        const state2 = reducer2(state1, actions.confirmFocusChange());
        expect(state2.shouldAdjustFocus).toBeFalsy();
        const reducer3 = factories.updateCurrentReducer(state2);
        const state3 = reducer3(state2, actions.updateCurrent({ id: '', focus: false, offset: 0 }));
        expect(state3.currentBrick).toBe('');
    });

    it('moveUpReducer', () => {
        const reducer = factories.moveUpReducer(initialState);
        const state = reducer(initialState, actions.moveUp('XXX2XX'));
        expect(state.wallData.length).toBe(3);
        expect(state.wallData[0].value).toBe('second');
        expect(state.wallData[1].value).toBe('first');
        expect(state.wallData[2].value).toBe('third');
    });

    it('moveDownReducer', () => {
        const reducer = factories.moveDownReducer(initialState);
        const state = reducer(initialState, actions.moveDown('XXX2XX'));
        expect(state.wallData.length).toBe(3);
        expect(state.wallData[0].value).toBe('first');
        expect(state.wallData[1].value).toBe('third');
        expect(state.wallData[2].value).toBe('second');
    });

    it('updateReducer-append', () => {
        const reducer = factories.updateDataReducer(initialState);
        const state = reducer(initialState, actions.updateData({
            id: '', type: 'paragraph', meta: {}, value: 'new',
        }));
        expect(state.wallData.length).toBe(4);
        expect(state.wallData[3]).toEqual({
            id: expect.any(String), type: 'paragraph', meta: {}, value: 'new',
        });
    });

    it('updateReducer-update', () => {
        const reducer = factories.updateDataReducer(initialState);
        const state = reducer(initialState, actions.updateData({
            id: 'XXX2XX', type: 'paragraph', meta: { fontSize: 2 }, value: 'update',
        }));
        expect(state.wallData.length).toBe(3);
        expect(state.wallData[1]).toEqual({
            id: 'XXX2XX', type: 'paragraph', meta: { fontSize: 2 }, value: 'update',
        });
    });

    it('deleteReducer', () => {
        const reducer = factories.deleteDataReducer(initialState);
        const state = reducer(initialState, actions.deleteData('XXX2XX'));
        expect(state.wallData.length).toBe(2);
        expect(state.wallData[0].value).toBe('first');
        expect(state.wallData[1].value).toBe('third');
    });

    it('duplicateReducer', () => {
        const reducer = factories.duplicateDataReducer(initialState);
        const state = reducer(initialState, actions.duplicateData('XXX2XX'));
        expect(state.wallData.length).toBe(4);
        expect(state.wallData[1].value).toBe('second');
        expect(state.wallData[2].value).toBe('second');
    });

    it('refugeReducer', () => {
        const reducer = factories.refugeDataReducer(initialState);
        const state = reducer(initialState, actions.refugeData('XXX2XX'));
        expect(state.wallData.length).toBe(2);
        expect(state.wallData[0].value).toBe('first');
        expect(state.wallData[1].value).toBe('third');
        expect(state.refugedData.length).toBe(1);
        expect(state.refugedData[0].value).toBe('second');
    });
});
