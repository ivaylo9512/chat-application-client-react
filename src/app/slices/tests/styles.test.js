import reducer, { resetStyleState, toggleHeaderVisibility, toggleSearchVisibility } from 'app/slices/stylesSlice';

const initialState = {
    isHeaderHidden: true,
    isSearchHidden: false
}

describe('styles slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should toggle header visibility', () => {
        expect(reducer(initialState, toggleHeaderVisibility())).toEqual({
            ...initialState,
            isHeaderHidden: !initialState.isHeaderHidden
        })
    })

    it('should toggle search visibility', () => {
        expect(reducer(initialState, toggleSearchVisibility())).toEqual({
            ...initialState,
            isSearchHidden: !initialState.isSearchHidden
        })
    })

    it('should reset state', () => {
        const state = {
            isHeaderHidden: !initialState.isHeaderHidden,
            isSearchHidden: !initialState.isSearchHidden,
        }
        expect(reducer(state, resetStyleState())).toEqual(initialState)
    })
})