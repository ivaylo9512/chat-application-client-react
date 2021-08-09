import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        pages: 0,
        maxPages: 0,
        users: [],
        lastUser: null,
        currentUsers: null
    },
    query: {
        take: 10,
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
            state.data.maxPages = state.pages + pageable.pages;
            state.data.pages = state.data.pages + pageable.data.length;
            state.data.lastUser = pageable.lastUser;
            state.data.users = [...state.data.users, ...pageable.data];
            state.data.currentUsers = pageable.data[pageable.data.length - 1];
            state.data.isLoading = false;
            state.error = null;
        },
        onUsersError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentUsers: (state, {payload}) => {
            state.data.currentUsers = payload;
        },
        resetUsersState: (state) => {
            state.data = initialState.data;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        },
    }
});

export const {usersRequest, resetUsersState, onUsersComplete, onUsersError,  setCurrentUsers } = usersSlice.actions 
export default usersSlice.reducer;

export const getUsersState = state => state.users;
export const getUsersQuery = state => state.users.query;
export const getUsersData = state => state.users.data;
export const getCurrentUsers = state => state.users.data.currentUsers;