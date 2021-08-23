import * as redux from 'react-redux';
import { mount, shallow } from 'enzyme';
import RequestList from 'components/RequestsList/RequestsList';
import Request from "components/Request/Request";
import { act } from 'react-dom/test-utils';
import { resetRequestsState, getRequests } from "app/slices/allRequestsSlice";

const requests = [{ id: 5, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}, 
    { id: 6, createdAt: '2021-08-23', sender: { firstName: 'firstname2', lastName: 'lastName2', profileImage: 'image2.png' }}]

jest.mock('components/Request/Request', () => () => <div></div>)

describe('RequestList unit tests', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })
    
    const createWrapper = (state, query) => {
        jest.spyOn(redux, 'useSelector').mockReturnValueOnce(state)
            .mockReturnValueOnce(query);

        return mount(
            <RequestList />
        )
    }

    it('should render requests', () => {
        const wrapper = createWrapper(requests);

        expect(wrapper.find(Request).length).toBe(2);
    })

    it('should render requests', async () => {
        const wrapper = createWrapper([], { take: 2 });

        expect(dispatchMock).toHaveBeenCalledWith(getRequests({ take: 2, pages: 1}));
    })

    it('should call dispatch with resetRequestsState on unmount', async () => {
        const wrapper = createWrapper(requests);

        await act(async() => wrapper.unmount())

        expect(dispatchMock).toHaveBeenNthCalledWith(2, resetRequestsState());
    })

    it('should render empty Container when requests are undefined', () => {
        const wrapper = createWrapper();

        expect(wrapper.find(Request).length).toBe(0)
        expect(wrapper.findByTestid('info').length).toBe(0)
    })
})