import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        length: 0,
        pages: 0,
        userChats: [],
        lastUserChat: null,
        currentUserChats: null
    },
    query: {
        take: 2,
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
        onUserChatsComplete: (state, {payload: data, query}) => {
            state.query = query;
            state.data.pages = Math.ceil((state.data.length + data.count) / state.query.take);
            state.data.length = state.data.length + data.length;
            state.data.lastUserChat = data.lastUserChat;
            state.data.userChats = [...state.data.userChats, ...data.userChats];
            state.data.currentUserChats = data.userChats[data.userChats.length - 1];
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

export const getUserChatsState = state => state.userChats;
export const getUserChatsQuery = state => state.userChats.query;
export const getUserChatsData = state => state.userChats.data;
export const getCurrentUserChats = state => state.userChats.currentUser;