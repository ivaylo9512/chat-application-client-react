import * as redux from 'react-redux';
import { mount, shallow } from 'enzyme';
import UsersView from 'components/UsersView/UsersView';
import { act } from 'react-dom/test-utils';
import { resetRequests } from 'app/slices/requestsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import Pagination from 'components/Pagination/Pagination';

jest.mock('components/Pagination/Pagination', () => () => <div></div>);
jest.mock('components/UsersList/UsersList', () => () => <div></div>);
jest.mock('components/Form/Form', () => () => <div></div>);
jest.mock('components/LoadingIndicator/LoadingIndicator', () => () => <div></div>);

describe('UsersView unit test', () => {
    let dispatchMock = jest.fn();
    let wrapper;
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        wrapper = mount(<UsersView />)
    }

    it('should call dispatch with reset resetRequests', async() => {
        await act(async() => createWrapper({ dataInfo: { currentData: null }}));

        expect(dispatchMock).toHaveBeenCalledWith(resetRequests());
    })

    it('should render LoadingIndicator', () => {
        createWrapper({ isLoading: true, dataInfo: { currentData: null }});
        
        expect(wrapper.find(LoadingIndicator).exists()).toBe(true)
        expect(wrapper.find(Pagination).exists()).toBe(false)
    })

    it('should render Pagination', () => {
        createWrapper({ isLoading: false, dataInfo: { currentData: null } });
        
        expect(wrapper.find(LoadingIndicator).exists()).toBe(false)
        expect(wrapper.find(Pagination).exists()).toBe(true)
    })

    it('should render error', () => {
        createWrapper({ error: 'Unavailable', dataInfo: { currentData: null } });
        
        expect(wrapper.findByTestid('error').text()).toBe('Unavailable')
    })
})