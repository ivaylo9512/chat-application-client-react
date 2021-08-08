import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        length: 0,
        pages: 0,
        users: [],
        lastUser: null,
        currentUsers: null
    },
    query: {
        take: 2,
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
        onUsersComplete: (state, {payload: data, query}) => {
            state.query = query;
            state.data.pages = Math.ceil((state.data.length + data.count) / state.query.take);
            state.data.length = state.data.length + data.length;
            state.data.lastUser = data.lastUser;
            state.data.users = [...state.data.users, ...data.users];
            state.data.currentUsers = data.users[data.users.length - 1];
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
export const getCurrentUser = state => state.users.currentUser;