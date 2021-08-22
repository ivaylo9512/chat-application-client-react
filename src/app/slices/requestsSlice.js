import { createSlice } from '@reduxjs/toolkit';
import requests from 'app/sagas/requests';

const initialState = {
    data: {}
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        sendRequest: (state, { payload: { id } }) => {
            let request = state.data[id] ? state.data[id] : state.data[id] = {}; 
            request.isLoading = true; 
            request.error = null;
        },
        onRequestComplete: (state, { payload: { id, chatWithUser, requestState }}) => {
            const request = state.data[id];

            request.isLoading = false;
            request.chatWithUser = chatWithUser;
            request.state = requestState;
        },
        onRequestError: (state, { payload: { id, message }}) => {
            const request = state.data[id];
            
            request.isLoading = false;
            request.error = message;
        },
        resetRequests: (state) => {
            state.data = initialState.data;
        }
    }
})

export const { onRequestComplete, sendRequest, onRequestError, resetRequests } = requestsSlice.actions;
export default requestsSlice.reducer;