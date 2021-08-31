import reducer, { getRequests, resetRequestsState, onGetRequestsComplete, onGetRequestsError,  setCurrentRequests } from 'app/slices/allRequestsSlice';

const initialState = {
    dataInfo: {
        pages: 0,
        maxPages: 0,
        data: [],
        lastData: null,
        currentData: null,
        currentPage: 1
    },
    query: {
        take: 2,
        direction: 'ASC',
    },
    isLoading: false,
    error: null,
}

describe('all requests slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on get request', () => {
        expect(reducer(initialState, getRequests())).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should update state on get requests complete', () => {
        const state = {
            ...initialState,
            isLoading: true,
            dataInfo: {
                data: [
                    [1, 2],
                    [3, 4]
                ],
                pages: 2,
                maxPages: 4,
                currentPage: 2,
                lastData: 4,
                currentData: [3, 4]
            }
        }
        const pageable = { 
            data: [
                [4, 5],
                [6, 7]
            ],
            pages: 2,
            lastRequest: 7
        }

        const query = { 
            take: 4, 
            direction: 'DESC'
        }

        expect(reducer(state, onGetRequestsComplete({ pageable, query }))).toEqual({
            ...initialState,
            dataInfo: {
                maxPages: 4,
                pages: 4,
                lastData: 7,
                data: [...state.dataInfo.data, ...pageable.data],
                currentData: pageable.data[1],
                currentPage: 4,
            },
            query,
            isLoading: false
        })
    })

    it('should update state on get requests error', () => {
        const state = {
            ...initialState,
            isLoading: true
        }
        expect(reducer(state, onGetRequestsError('error'))).toEqual({
            ...initialState,
            isLoading: false,
            error: 'error'
        })
    })

    it('should set current requests', () => {
        const payload = {
            currentData: [2, 3],
            currentPage: 5
        }
        expect(reducer(initialState, setCurrentRequests(payload))).toEqual({
            ...initialState,
            dataInfo: {
                ...initialState.dataInfo,
                currentData: payload.currentData,
                currentPage: payload.currentPage
            }
        })
    })

    it('should reset state', () => {
        const state = {
            query: {
                take: 5,
                direction: 'DESC'
            },
            isLoading: true,
            dataInfo: {
                data: [
                    [1, 2],
                    [3, 4]
                ],
                pages: 2,
                maxPages: 4,
                currentPage: 2,
                lastData: 4,
                currentData: [3, 4]
            }
        }

        expect(reducer(state, resetRequestsState())).toEqual(initialState)
    })
})