import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { acceptRequest } from 'app/sagas/acceptRequest';
import { BASE_URL } from 'appConstants';
import requestReducer, { onRequestComplete, onRequestError } from 'app/slices/requestsSlice';
import { addChat } from 'app/slices/chatsSlice';

describe('accept request saga tests', () => {
    it('should update request on accept request', () => {
        const userId = 5;
        const id = 2;
        const requestState = 'completed'; 
        const chatWithUser = { 
            id: 1 
        }

        return expectSaga(acceptRequest, { payload: { userId, id} })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/accept/2`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(chatWithUser), { status: 200 })]
            ])
            .put(addChat(chatWithUser))
            .put(onRequestComplete({
                id,
                chatWithUser: chatWithUser,
                requestState,
                userId
            }))
            .hasFinalState({
                data: {
                    5: {
                        id,
                        isLoading: false,
                        chatWithUser: chatWithUser,
                        state: requestState
                    }
                }
            })
            .run()
    })

    it('should set error on accept request error', () => {
        const userId = 5;
        const id = 2;
        const message = 'User not found.';
        return expectSaga(acceptRequest, { payload: { userId, id }})
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/accept/2`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(message, { status: 404 } )]
            ])
            .put(onRequestError({ 
                id, 
                userId, 
                message, 
                requestState: 'accept', 
            }))
            .hasFinalState({
                data: {
                    5: {
                        id,
                        isLoading: false,
                        error: message,
                        state: 'accept',
                    }
                }
            })
            .run()
    })
})