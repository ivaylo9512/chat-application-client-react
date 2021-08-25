import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {}
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        sendRequest: (state, { payload: id }) => {
            let request = state.data[id] ? state.data[id] : state.data[id] = {}; 
            
            request.isLoading = true; 
            request.error = null;
        },
        acceptRequest: (state, { payload: { userId } }) => {
            let request = state.data[userId] ? state.data[userId] : state.data[userId] = {}; 

            request.isLoading = true; 
            request.error = null;
        },
        denyRequest: (state, { payload: { userId }}) => {
            let request = state.data[userId] ? state.data[userId] : state.data[userId] = {}; 

            request.isLoading = true; 
            request.error = null;
        },
        onRequestComplete: (state, { payload: { userId, chatWithUser, requestState, id }}) => {
            const request = state.data[userId];

            request.id = id;
            request.isLoading = false;
            request.chatWithUser = chatWithUser;
            request.state = requestState;
        },
        onRequestError: (state, { payload: { userId, message, requestState }}) => {
            const request = state.data[userId];

            request.state = requestState;
            request.isLoading = false;
            request.error = message;
        },
        resetRequests: (state) => {
            state.data = initialState.data;
        }
    }
})

export const { onRequestComplete, sendRequest, onRequestError, resetRequests, acceptRequest, denyRequest } = requestsSlice.actions;
export default requestsSlice.reducer;