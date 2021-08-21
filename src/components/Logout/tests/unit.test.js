import * as redux from 'react-redux';
import Logout from 'components/Logout/Logout'
import { mount } from 'enzyme';
import { onLogout } from 'app/slices/authenticateSlice';
import { Redirect, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Logout unit tests', () => {
    let wrapper;
    let dispatchMock = jest.fn();
    let history;

    beforeEach(() => {
        history = createMemoryHistory();

        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
        wrapper = mount(
            <Router history={history}>
                <Logout />
            </Router>)
    })

    it('should call dispatch with onLogout', () => {
        expect(dispatchMock).toHaveBeenCalledWith(onLogout());
    })

    it('call history push with /', () => {
        expect(history.location.pathname).toBe('/');
    })

    it('should contain redirect', () => {
        expect(wrapper.find(Redirect).prop('to')).toBe('/');
    })
})