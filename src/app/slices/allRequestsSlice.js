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
        take: 2,
        direction: 'ASC',
    },
    isLoading: false,
    error: null,
}

const allRequestsSlice = createSlice({
    name: 'allRequests',
    initialState,
    reducers: {
        getRequests: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        onGetRequestsComplete: (state, {payload: {pageable, query}}) => {
            state.query = query;
            state.dataInfo.maxPages = state.dataInfo.pages + pageable.pages;
            state.dataInfo.pages = state.dataInfo.pages + pageable.data.length;
            state.dataInfo.currentPage = state.dataInfo.pages;
            state.dataInfo.lastData = pageable.lastRequest;
            state.dataInfo.data = [...state.dataInfo.data, ...pageable.data];
            state.dataInfo.currentData = pageable.data[pageable.data.length - 1] || state.dataInfo.currentData;
            state.isLoading = false;
            state.error = null;
        },
        onGetRequestsError: (state, {payload}) => {
            state.error = payload;
            state.isLoading = false;
        },
        setCurrentRequests: (state, { payload: {currentData, currentPage}}) => {
            state.dataInfo.currentData = currentData;
            state.dataInfo.currentPage = currentPage;
        },
        resetRequestsState: (state) => {
            state.dataInfo = initialState.dataInfo;
            state.query = initialState.query;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
        }
    }
});

export const { getRequests, resetRequestsState, onGetRequestsComplete, onGetRequestsError,  setCurrentRequests } = allRequestsSlice.actions 
export default allRequestsSlice.reducer;

export const getAllRequestsState = state => state.allRequests;
export const getAllRequestsQuery = state => state.allRequests.query;
export const getAllRequestsData = state => state.allRequests.dataInfo;
export const getCurrentAllRequests = state => state.allRequests.dataInfo.currentData;