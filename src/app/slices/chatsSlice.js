import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        currentChat: null,
        chats: [],
        searchName: null
    },
    query: {
        take: 2,
        direction: 'ASC',
        name: '',
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
            state.data.pages = Math.ceil((state.data.length + data.count) / state.query.take);
            state.data.length = state.data.length + data.length;
            state.data.lastChat = data.lastChat;
            state.data.chats = [...state.data.chats, ...data.chats];
            state.data.isLoading = false;
            state.error = null;
        },
        onChatsError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentChat: (state, {payload}) => {
            state.currentChat = payload;
        },   
        setSearchName: (state, {payload}) => {
            state.searchName = payload;
        },       
        resetChatsState: (state) => {
            state.data = initialState.data;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        },
    }
});

export const {chatsRequest, resetChatsState, setCurrentChat, onChatsComplete, onChatsError,  setSearchName} = chatsSlice.actions;
export default chatsSlice.reducer;

export const getChatsState = state => state.chats;
export const getChatsQuery = state => state.chats.query;
export const getChatsData = state => state.chats.data;
export const getCurrentChat = state => state.chats.currentChat;
export const getChatsSearchName = state => state.chats.searchName;