import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isHeaderHidden: true,
    isSearchHidden: false
}

const styleSlice = createSlice({
    name: 'styles',
    initialState,
    reducers: {
        toggleHeaderVisibility: (state) => {
            state.isHeaderHidden = !state.isHeaderHidden;
        },
        toggleSearchVisibility: (state) => {
            state.isSearchHidden = !state.isSearchHidden;
        },
        resetStyleState: (state) => {
            state.isHeaderHidden = initialState.isHeaderHidden;
            state.isSearchHidden = initialState.isSearchHidden;
        }
    }
})

export const { resetStyleState, toggleHeaderVisibility, toggleSearchVisibility } = styleSlice.actions;
export default styleSlice.reducer;

export const getStylesState = state => state.styles;
export const getHeaderVisibility = state => state.styles.isHeaderHidden;
export const getSearchVisibility = state => state.styles.isSearchHidden;