import MenuNav from 'components/MenuNav/MenuNav';
import { mount } from 'enzyme';
import * as Redux from 'react-redux';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('MenuNav snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(Redux, 'useSelector');
    
        const spyOnUseDispatch = jest.spyOn(Redux, 'useDispatch');
        spyOnUseDispatch.mockReturnValue(jest.fn());
    });

    const createWrapper = (state, path) => {
        selectorSpy.mockReturnValue(state);
    
        return mount(
            <MemoryRouter initialEntries={[path]}>
                <MenuNav />
            </MemoryRouter>
            
        )
    }

    it('should match snapshot when header is not hidden', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/');

        expect(wrapper.find(MenuNav)).toMatchSnapshot();
    })
    
    it('should match snapshot when search is not hidden and path is /searchChat', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: false}, '/searchChat');

        expect(wrapper.find(MenuNav)).toMatchSnapshot();
    })

    it('should match snapshot when search is hidden and path is /searchChat', () => {
        const wrapper = createWrapper({isHeaderHidden: false, isSearchHidden: true}, '/searchChat');

        expect(wrapper.find(MenuNav)).toMatchSnapshot();
    })

    it('should match snapshot when header is hidden', () => {
        const wrapper = createWrapper({isHeaderHidden: true, isSearchHidden: false}, '/');

        expect(wrapper.find(MenuNav)).toMatchSnapshot();
    })
})