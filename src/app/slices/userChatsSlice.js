import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataInfo: {
        pages: 0,
        maxPages: 0,
        data: [],
        lastData: null,
        currentData: null
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
            state.dataInfo.maxPages = state.dataInfo.pages + pageable.pages;
            state.dataInfo.pages = state.dataInfo.pages + pageable.data.length;
            state.dataInfo.lastData = pageable.lastUserChat;
            state.dataInfo.data = [...state.dataInfo.data, ...pageable.data];
            state.dataInfo.currentData = pageable.data[pageable.data.length - 1] || [];
            state.dataInfo.isLoading = false;
            state.error = null;
        },
        onUserChatsError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentUserChats: (state, {payload}) => {
            state.dataInfo.currentData = payload;
        },
        resetUserChatsState: (state) => {
            state.dataInfo = initialState.dataInfo;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        },
    }
});

export const {userChatsRequest, resetUserChatsState, onUserChatsComplete, onUserChatsError,  setCurrentUserChats } = userChatsSlice.actions 
export default userChatsSlice.reducer;

export const getUserChats = state => state.userChats.dataInfo.data;
export const getUserChatsState = state => state.userChats;
export const getUserChatsQuery = state => state.userChats.query;
export const getUserChatsData = state => state.userChats.dataInfo;
export const getCurrentUserChats = state => state.userChats.dataInfo.currentData;