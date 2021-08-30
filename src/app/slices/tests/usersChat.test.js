import reducer, { userChatsRequest, onUserChatsComplete, onUserChatsError,  setCurrentUserChats, resetUserChatsState } from 'app/slices/userChatsSlice';

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
        take: 4,
        direction: 'ASC',
        name: ""
    },
    isLoading: false,
    error: null,
}

describe('user chats slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on user chats request', () => {
        expect(reducer(initialState, userChatsRequest())).toEqual({
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
            lastUserChat: 7
        }

        const query = { 
            take: 6, 
            direction: 'DESC',
            name: "test"
        }

        expect(reducer(state, onUserChatsComplete({ pageable, query }))).toEqual({
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
        expect(reducer(state, onUserChatsError('error'))).toEqual({
            ...initialState,
            isLoading: false,
            error: 'error'
        })
    })

    it('should set current users', () => {
        const payload = {
            data: [2, 3],
            currentPage: 5
        }
        expect(reducer(initialState, setCurrentUserChats(payload))).toEqual({
            ...initialState,
            dataInfo: {
                ...initialState.dataInfo,
                currentData: payload.data,
                currentPage: payload.page
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

        expect(reducer(state, resetUserChatsState())).toEqual(initialState)
    })
})