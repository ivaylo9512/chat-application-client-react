import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    headerIsHidden: true,
    searchIsHidden: false
}

const stylesReducer = createSlice({
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

export const { resetStyleState, toggleHeaderVisibility, toggleSearchVisibility } = stylesReducer.actions;
export default stylesReducer.reducer;

export const getStylesState = state = state.styles;
export const getStylesHeaderState = state = state.styles.headerIsHidden;
export const getStylesSearchState = state = state.styles.searchIsHidden;