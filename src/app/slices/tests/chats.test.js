import reducer, { chatsRequest, resetChatsState, setCurrentChat, onChatsComplete, onChatsError, addChat } from 'app/slices/chatsSlice';

const initialState = {
    data: {
        chats: [],
        lastChat: null,
        isLastPage: false,
        currentChat: null
    },
    query: {
        take: 2,
        direction: 'ASC',
    },
    isLoading: false,
    error: null,
}

describe('chats slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on chats request', () => {
        expect(reducer(initialState, chatsRequest())).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should update state on chats request complete', () => {
        const state = {
            ...initialState,
            isLoading: true,
            data: {
                chats: [ 1, 2, 3 ],
                isLastPage: false,
                lastChat: 3,
                currentChat: null
            }
        }
        const pageable = { 
            data: [ 4, 5, 6],
            lastChat: 6,
            isLastPage: true
        }

        const query = { 
            take: 4, 
            direction: 'DESC'
        }

        expect(reducer(state, onChatsComplete({ pageable, query }))).toEqual({
            ...initialState,
            data: {
                chats: [...state.data.chats, ...pageable.data ],
                isLastPage: true,
                lastChat: 6,
                currentChat: null
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
        expect(reducer(state, onChatsError('error'))).toEqual({
            ...initialState,
            isLoading: false,
            error: 'error'
        })
    })

    it('should set current chat', () => {
        const currentChat = {
            id: 3
        }
        expect(reducer(initialState, setCurrentChat(currentChat))).toEqual({
            ...initialState,
            data: {
                ...initialState.data,
                currentChat
            }
        })
    })

    it('should add chat', () => {
        const state = {
            ...initialState,
            data: {
                ...initialState.data,
                chats: [2, 3, 4]
            }
        }
        expect(reducer(state, addChat(1))).toEqual({
            ...initialState,
            data: {
                ...initialState.data,
                chats: [1, 2, 3, 4]
            }
        })
    })

    it('should reset state', () => {
        const state = {
            ...initialState,
            isLoading: true,
            data: {
                chats: [ 1, 2, 3 ],
                isLastPage: true,
                lastChat: 3,
                currentChat: {
                    id: 1
                }
            }
        }

        expect(reducer(state, resetChatsState())).toEqual(initialState)
    })
})