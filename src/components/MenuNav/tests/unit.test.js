import MenuNav from 'components/MenuNav/MenuNav';
import { mount, shallow } from 'enzyme';
import * as redux from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { toggleSearchVisibility, toggleHeaderVisibility } from 'app/slices/stylesSlice';

describe('MenuNav snapshot tests', () => {
    let dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    const createWrapper = (state, route) => {
        const history = createMemoryHistory();

        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        return mount(
            <MemoryRouter initialEntries={[ route ]} initialIndex={0}>
                <MenuNav />
            </MemoryRouter>
        );

    }

    it('should call dispatch with toggleHeaderVisibility', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/searchChat');

        wrapper.findByTestid('toggleHeader').at(0).props().onClick();
        expect(dispatchMock).toHaveBeenCalledWith(toggleHeaderVisibility());
    })

    it('should match searcChat to prop', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/');
        expect(wrapper.findByTestid('searchChat').at(0).prop('to')).toBe('/searchChat')
    })

    it('should match searcUsers to prop', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/');
        expect(wrapper.findByTestid('searchUsers').at(0).prop('to')).toBe('/searchUsers')
    })

    it('should match logout to prop', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/');
        expect(wrapper.findByTestid('logout').at(0).prop('to')).toBe('/logout')
    })

    it('should match requests to prop', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/');
        expect(wrapper.findByTestid('requests').at(0).prop('to')).toBe('/requests')
    })

    it('should have toggleChat when path is /searchChat', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/searchChat');

        expect(wrapper.findByTestid('toggleSearch').exists()).toBe(true);
    })

    it('should call dispatch with toggleSearchVisibility', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/searchChat');

        wrapper.findByTestid('toggleSearch').at(0).props().onClick();
        expect(dispatchMock).toHaveBeenCalledWith(toggleSearchVisibility());
    })
    
})