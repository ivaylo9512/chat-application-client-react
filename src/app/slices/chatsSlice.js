import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        chats: [],
        lastChat: null,
        isLastPage: false,
        currentChat: null
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
        onChatsComplete: (state, { payload: { pageable, query }}) => {
            state.query = query;
            state.data.isLastPage = pageable.isLastPage;
            state.data.lastChat = pageable.lastChat;
            state.data.chats = [...state.data.chats, ...pageable.data];
            state.isLoading = false;
            state.error = null;
        },
        onChatsError: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentChat: (state, { payload }) => {
            state.data.currentChat = payload;
        },
        addChat: (state, { payload }) => {
            state.data.chats = [payload, ...state.data.chats]
        },
        resetChatsState: (state) => {
            state.data = initialState.data;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        },
    }
});

export const { chatsRequest, resetChatsState, setCurrentChat, onChatsComplete, onChatsError, addChat } = chatsSlice.actions;
export default chatsSlice.reducer;

export const getChatsState = state => state.chats;
export const getCurrentChat = state => state.chats.currentChat;
export const getChatsQuery = state => state.chats.query;
export const getChatsData = state => state.chats.data;