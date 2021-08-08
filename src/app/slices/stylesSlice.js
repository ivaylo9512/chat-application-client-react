import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    headerIsHidden: true,
    searchIsHidden: false
}

const styleSlice = createSlice({
    name: 'styles',
    initialState,
    reducers: {
        toggleHeaderVisibility: (state) => {
            state.headerIsHidden = !state.headerIsHidden;
        },
        toggleSearchVisibility: (state) => {
            state.searchIsHidden = !state.searchIsHidden;
        },
        resetStyleState: (state) => {
            state.headerIsHidden = initialState.headerIsHidden;
            state.searchIsHidden = initialState.searchIsHidden;
        }
    }
})

export const { resetStyleState, toggleHeaderVisibility, toggleSearchVisibility } = styleSlice.actions;
export default styleSlice.reducer;

export const getStylesState = state => state.styles;
export const getHeaderVisibility = state => state.styles.headerIsHidden;
export const getSearchVisibility = state => state.styles.searchIsHidden;