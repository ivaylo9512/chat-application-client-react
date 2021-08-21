import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requests: {}
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        sendRequest: (state, { payload: id }) => {
            const request = state.requests[id];
            request 
                ? request.isLoading = true 
                : state.requests[id] = { isLoading: true };
        },
        onRequestComplete: (state, { payload }) => {
            const request = state.requests[payload.id];
            request.isLoading = false;
            request.state = payload.data;
        },
        onRequestError: (state, { payload }) => {
            const request = state.requests[payload.id];

            request.isLoading = false;
            request.error = payload.error;
        }
    }
})

export const { onRequestComplete, sendRequest, onRequestError } = requestsSlice.actions;
export default requestsSlice.reducer;