import reducer, { usersRequest, resetUsersState, onUsersComplete, onUsersError,  setCurrentUsers } from 'app/slices/usersSlice';

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
        name: ""
    },
    isLoading: false,
    error: null,
}

describe('users slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on users request', () => {
        expect(reducer(initialState, usersRequest())).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should update state on request complete', () => {
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
            lastUser: 7
        }

        const query = { 
            take: 4, 
            direction: 'DESC',
            name: "test"
        }

        expect(reducer(state, onUsersComplete({ pageable, query }))).toEqual({
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

    it('should update state on request error', () => {
        const state = {
            ...initialState,
            isLoading: true
        }
        expect(reducer(state, onUsersError('error'))).toEqual({
            ...initialState,
            isLoading: false,
            error: 'error'
        })
    })

    it('should set current users', () => {
        const payload = {
            currentData: [2, 3],
            currentPage: 5
        }
        expect(reducer(initialState, setCurrentUsers(payload))).toEqual({
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
                direction: 'DESC',
                name: "test"
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

        expect(reducer(state, resetUsersState())).toEqual(initialState)
    })
})