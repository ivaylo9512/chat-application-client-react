import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { BASE_URL } from 'appConstants';
import usersReducer, { getUsersData, onUsersComplete, onUsersError } from 'app/slices/usersSlice';
import { getUsers } from 'app/sagas/users';

describe('users saga tests', () => {
    it('should set state on users request with split array on take count in state', () => {
        const lastData = {
            id: 3, 
            firstName: 'c', 
            lastName: 'c' 
        }

        const currentData = [ { id: 1, firstName: 'a', lastName: 'a'  }, { id: 2, firstName: 'b', lastName: 'b' }, lastData ];

        const state = {
            dataInfo: {
                pages: 1,
                maxPages: 2,
                data: [ currentData ],
                lastData,
                currentChat: null,
                currentData,
                currentPage: 1
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
            pages: 2,
            name: ''
        }

        const pageable = {
            data: [{ id: 4, firstName: 'd', lastName: 'd' }, { id: 5, firstName: 'e', lastName: 'e' }, { id: 6, firstName: 'f', lastName: 'f' }, 
                { id: 7, firstName: 'g', lastName: 'g' }, { id: 8, firstName: 'h', lastName: 'h' }, { id: 9, firstName: 'j', lastName: 'j' }],
            count: 12
        }

        const completePayload = {
            pageable: {
                data: [[ pageable.data[0], pageable.data[1], pageable.data[2] ], 
                    [ pageable.data[3], pageable.data[4], pageable.data[5] ]],
                lastUser: pageable.data[5],
                pages: 4,
                count: 12
            },
            query
        }
        return expectSaga(getUsers, { payload: query })
            .withReducer(usersReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/api/users/auth/searchForUsers/${query.take * query.pages}/${lastData.firstName} ${lastData.lastName}/${lastData.id}`, {
                    headers:{
                        Authorization: null
                    }}), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getUsersData), state.dataInfo]
            ])
            .put(onUsersComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 3,
                    maxPages: 5,
                    currentPage: 3,
                    data: [...state.dataInfo.data, ...completePayload.pageable.data],
                    currentData: completePayload.pageable.data[1],
                    lastData: completePayload.pageable.data[1][2],
                    currentChat: null
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should set error on users request error', () => {
        const error = '0 is not a valid take value';

        const query = {
            take: 0,
            direction: 'ASC',
            pages: 1
        }

        return expectSaga(getUsers, { payload: query })
            .withReducer(usersReducer)
            .provide([
                [call(fetch, `${BASE_URL}/api/users/auth/searchForUsers/0`, {
                    headers:{
                        Authorization: null
                    }
                    }), 
                    new Response(error, { status: 422 })
                ],
                [select(getUsersData), { data: { lastData: null } }]
            ])
            .put(onUsersError(error))
            .hasFinalState({
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
                    name: ''
                },
                isLoading: false,
                error,
            })
            .run()
    })

})