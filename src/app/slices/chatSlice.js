import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chat: null,
    isLoading: false,
    error: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chatRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setChat: (state, {payload}) => {
            state.chat = payload;
        },
        onChatComplete: (state, {payload}) => {
            state.chat = payload;
            state.isLoading = false;
            state.error = null;
        },
        onChatError: (state, {payload}) => {
            state.isLoading = false;
            state.error = null;
        },
        resetChat: (state) => {
            state.chat = initialState.chat; 
            state.isLoading = initialState.isLoading; 
            state.error = initialState.error; 
        }
    }
})

export const {chatRequest, onChatComplete, onChatError, resetChat} = chatSlice.actions;
export default chatSlice.reducer;

export const getChatState = state => state.chat;