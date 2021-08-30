import reducer, { onRequestComplete, sendRequest, onRequestError, resetRequests, acceptRequest, denyRequest } from 'app/slices/requestsSlice';

const initialState = {
    data: {}
}

describe('requests slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should update request on request complete', () => {
        const state = {
            data: {
                3: {
                    isLoading: true,
                    error: null,
                }
            }
        }
        const payload = {
            id: 5,
            userId: 3,
            requestState: 'pending',
            chatWithUser: {
                id: 1,
            }
        }
        
        expect(reducer(state, onRequestComplete(payload))).toEqual({
            data: {
                3: {
                    id: payload.id,
                    isLoading: false,
                    error: null,
                    state: payload.requestState,
                    chatWithUser: {
                        id: 1,
                    }
                }
            }
        })
    })

    it('should set error on request error', () => {
        const state = {
            data: {
                3: {
                    id: 5,
                    error: null,
                    state: 'pending',
                    isLoading: true
                }
            }
        }

        const payload = {
            id: 5,
            userId: 3,
            requestState: 'pending',
            message: 'error'
        }

        expect(reducer(state, onRequestError(payload))).toEqual({
            data: {
                3: {
                    id: payload.id,
                    isLoading: false,
                    error: payload.message,
                    state: payload.requestState
                }
            }
        })
    })
    it('should update state on send request', () => {
        expect(reducer(initialState, sendRequest(2))).toEqual({
            data: {
                2: {
                    isLoading: true,
                    error: null
                }
            }
        })
    })

    it('should update state on accept request', () => {
        expect(reducer(initialState, acceptRequest({ userId: 5 }))).toEqual({
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        })
    })
    
    it('should update state on deny request', () => {
        expect(reducer(initialState, denyRequest({ userId: 3 }))).toEqual({
            data: {
                3: {
                    isLoading: true,
                    error: null
                }
            }
        })
    })

    it('should reset state', () => {
        const state = {
            data: {
                3: {
                    id: 5,
                    error: 'error',
                    state: 'pending',
                    isLoading: true
                }
            }
        }
        expect(reducer(state, resetRequests())).toEqual(initialState);
    })
})