import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        pages: 0,
        maxPages: 0,
        userChats: [],
        lastUserChat: null,
        currentUserChats: null
    },
    query: {
        take: 4,
        direction: 'ASC',
        name: '',
    },
    isLoading: false,
    error: null,    
}

const userChatsSlice = createSlice({
    name: 'userChats',
    initialState,
    reducers: {
        userChatsRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        onUserChatsComplete: (state, {payload: {pageable, query}}) => {
            state.query = query;
            state.data.maxPages = state.data.pages + pageable.pages;
            state.data.pages = state.data.pages + pageable.data.length;
            state.data.lastUserChat = pageable.lastUserChat;
            state.data.userChats = [...state.data.userChats, ...pageable.data];
            state.data.currentUserChats = pageable.data[pageable.data.length - 1] || [];
            state.data.isLoading = false;
            state.error = null;
        },
        onUserChatsError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentUserChats: (state, {payload}) => {
            state.data.currentUserChats = payload;
        },
        resetUserChatsState: (state) => {
            state.data = initialState.data;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        },
    }
});

export const {userChatsRequest, resetUserChatsState, onUserChatsComplete, onUserChatsError,  setCurrentUserChats } = userChatsSlice.actions 
export default userChatsSlice.reducer;

export const getUserChats = state => state.userChats.data.userChats;
export const getUserChatsState = state => state.userChats;
export const getUserChatsQuery = state => state.userChats.query;
export const getUserChatsData = state => state.userChats.data;
export const getCurrentUserChats = state => state.userChats.data.currentUserChats;