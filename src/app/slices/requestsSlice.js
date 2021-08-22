import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {}
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        sendRequest: (state, { payload: { id } }) => {
            const request = state.data[id];
            request 
                ? request.isLoading = true 
                : state.data[id] = { isLoading: true };
        },
        onRequestComplete: (state, { payload: id }) => {
            state.data[id].isLoading = false;
        },
        onRequestError: (state, { payload: id }) => {
            state.data[id].isLoading = false;
        },
        resetRequests: (state) => {
            state.data = initialState.data;
        }
    }
})

export const { onRequestComplete, sendRequest, onRequestError, resetRequests } = requestsSlice.actions;
export default requestsSlice.reducer;