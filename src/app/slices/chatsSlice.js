import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        chats: [],
        lastChat: null,
        isLastPage: false
    },
    query: {
        take: 2,
        direction: 'ASC',
    },
    isLoading: false,
    error: null,
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        chatsRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        onChatsComplete: (state, {payload: {data, query}}) => {
            state.query = query;
            state.data.isLastPage = data.isLastPage;
            state.data.lastChat = data.lastChat;
            state.chats = [...state.chats, ...data.chats];
            state.data.isLoading = false;
            state.error = null;
        },
        onChatsError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        resetChatsState: (state) => {
            state.data = initialState.data;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        },
    }
});

export const {chatsRequest, resetChatsState, onChatsComplete, onChatsError} = chatsSlice.actions;
export default chatsSlice.reducer;

export const getChatsState = state => state.chats;
export const getChatsQuery = state => state.chats.query;
export const getChatsData = state => state.chats.data;