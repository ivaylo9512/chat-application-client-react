import chatsReducer, { onChatsComplete, onChatsError, getChatsData, chatsRequest } from 'app/slices/chatsSlice';
import { getChats } from 'app/sagas/chats' 
import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { BASE_URL } from 'appConstants';
import { onLogout } from 'app/slices/authenticateSlice';
import { wrapper } from 'app/sagas/index.js';

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

describe('chats saga tests', () => {
    it('should set state on chats request with chats in state', () => {
        const lastChat = {
            id: 3, 
            updatedAt: '2021-09-07'
        }
        const state = {
            data: {
                chats: [{ id: 1, updatedAt: '2021-09-09' }, { id: 2, updatedAt: '2021-09-08' }, lastChat ],
                lastChat,
                isLastPage: false,
                currentChat: 2
            },
            query: {
                take: 3,
                direction: 'ASC',
            },
            isLoading: true,
            error: null
        }

        const query = {
            take: 3,
            direction: 'ASC',
            pages: 1
        }

        const pageable = {
            data: [{ id: 4, updatedAt: '2021-09-06' }, { id: 5, updatedAt: '2021-09-05' }, { id: 6, updatedAt: '2021-09-04' }],
            count: 1
        }

        return expectSaga(getChats, { payload: query })
            .withReducer(chatsReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/api/chats/auth/findChats/${query.take}/${lastChat.updatedAt}/${lastChat.id}`, {
                    headers:{
                        Authorization: null
                    }}), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getChatsData), state.data]
            ])
            .put(onChatsComplete({
                pageable: {
                    data: pageable.data,
                    isLastPage: true,
                    lastChat: pageable.data[2],
                    count: 1
                },
                query
            }))
            .hasFinalState({
                data: {
                    chats: [...state.data.chats, ...pageable.data],
                    lastChat: pageable.data[2],
                    isLastPage: true,
                    currentChat: 2
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should set error on chats request error', () => {
        const error = '0 is not a valid take value';

        const query = {
            take: 0,
            direction: 'ASC',
            pages: 1
        }

        return expectSaga(getChats, { payload: query })
            .withReducer(chatsReducer)
            .withState(initialState)
            .provide([
                [call(fetch, `${BASE_URL}/api/chats/auth/findChats/0`, {
                    headers:{
                        Authorization: null
                    }
                    }), 
                    new Response(error, { status: 422 })
                ],
                [select(getChatsData), { data: { lastChat: null } }]])
            .put(onChatsError(error))
            .hasFinalState({
                data: {
                    chats: [],
                    lastChat: null,
                    isLastPage: false,
                    currentChat: null
                },
                error,
                isLoading: false,
                query:{
                    direction: 'ASC',
                    take: 2
                }
            })
            .run()
    })

    it('should set state on chats request with initial state', () => {
        const query = {
            take: 3,
            direction: 'ASC',
            pages: 1
        }

        const pageable = {
            data: [{ id: 4, updatedAt: '2021-09-06' }, { id: 5, updatedAt: '2021-09-05' }, { id: 6, updatedAt: '2021-09-04' }],
            count: 1
        }

        return expectSaga(getChats, { payload: query })
            .withReducer(chatsReducer)
            .withState(initialState)
            .provide([
                [call(fetch, `${BASE_URL}/api/chats/auth/findChats/${query.take}`, {
                    headers:{
                        Authorization: null
                    }}), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getChatsData), { data: { lastChat: null } }]
            ])
            .put(onChatsComplete({
                pageable: {
                    data: pageable.data,
                    isLastPage: true,
                    lastChat: pageable.data[2],
                    count: 1
                },
                query
            }))
            .hasFinalState({
                data: {
                    chats: pageable.data,
                    lastChat: pageable.data[2],
                    isLastPage: true,
                    currentChat: null
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should set state on chats request with initial state and more then 1 pages count', () => {
        const query = {
            take: 3,
            direction: 'ASC',
            pages: 1
        }

        const pageable = {
            data: [{ id: 4, updatedAt: '2021-09-06' }, { id: 5, updatedAt: '2021-09-05' }, { id: 6, updatedAt: '2021-09-04' }],
            count: 2
        }

        return expectSaga(getChats, { payload: query })
            .withReducer(chatsReducer, initialState)
            .withState(initialState)
            .provide([
                [call(fetch, `${BASE_URL}/api/chats/auth/findChats/${query.take}`, {
                    headers:{
                        Authorization: null
                    }}), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getChatsData), { data: { lastChat: null } }]
            ])
            .put(onChatsComplete({
                pageable: {
                    data: pageable.data,
                    isLastPage: false,
                    lastChat: pageable.data[2],
                    count: 2
                },
                query
            }))
            .hasFinalState({
                data: {
                    chats: pageable.data,
                    lastChat: pageable.data[2],
                    isLastPage: false,
                    currentChat: null
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should call onLogout error with 401', () => {
        const query = {
            take: 3,
            direction: 'ASC',
            pages: 1
        }

        return expectSaga(wrapper(getChats), { payload: query })
            .withReducer(chatsReducer)
            .withState(initialState)
            .provide([
                [call(fetch, `${BASE_URL}/api/chats/auth/findChats/${query.take}`, {
                    headers:{
                        Authorization: null
                    }
                }), new Response('Jwt token has expired.', { status: 401 })],
                [select(getChatsData), { data: { lastChat: null } }]
            ])
            .put(onLogout('Session has expired.'))
            .run()
    })
})