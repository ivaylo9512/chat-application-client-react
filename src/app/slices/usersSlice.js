import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataInfo: {
        pages: 0,
        maxPages: 0,
        data: [],
        lastData: null,
        currentData: null,
        currentPage: 0
    },
    query: {
        take: 5,
        direction: 'ASC',
        name: '',
    },
    isLoading: false,
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        onUsersComplete: (state, {payload: {pageable, query}}) => {
            state.query = query;
            state.dataInfo.maxPages = state.dataInfo.pages + pageable.pages;
            state.dataInfo.pages = state.dataInfo.pages + pageable.data.length;
            state.dataInfo.currentPage = state.dataInfo.pages;
            state.dataInfo.lastData = pageable.lastUser;
            state.dataInfo.data = [...state.dataInfo.data, ...pageable.data];
            state.dataInfo.currentData = pageable.data[pageable.data.length - 1] || state.dataInfo.currentData;
            state.isLoading = false;
            state.error = null;
        },
        onUsersError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentUsers: (state, {payload: { currentData, currentPage }}) => {
            state.dataInfo.currentData = currentData;
            state.dataInfo.currentPage = currentPage;
        },
        resetUsersState: (state) => {
            state.dataInfo = initialState.dataInfo;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        }
    }
});

export const  { usersRequest, resetUsersState, onUsersComplete, onUsersError,  setCurrentUsers } = usersSlice.actions 
export default usersSlice.reducer;

export const getUsersState = state => state.users;
export const getUsersQuery = state => state.users.query;
export const getUsersData = state => state.users.dataInfo;
export const getCurrentUsers = state => state.users.dataInfo.currentData;