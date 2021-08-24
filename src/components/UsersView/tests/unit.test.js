import * as redux from 'react-redux';
import { mount, shallow } from 'enzyme';
import UsersView from 'components/UsersView/UsersView';
import { act } from 'react-dom/test-utils';
import { resetRequests } from 'app/slices/requestsSlice';

jest.mock('components/Pagination/Pagination', () => () => <div></div>);
jest.mock('components/UsersList/UsersList', () => () => <div></div>);
jest.mock('components/Form/Form', () => () => <div></div>);

describe('UsersView unit test', () => {
    let dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return mount(<UsersView />)
    }

    it('should call dispatch with reset resetRequests', async() => {
        await act(async() => createWrapper({ currentData: undefined}));

        expect(dispatchMock).toHaveBeenCalledWith(resetRequests());
    })
})