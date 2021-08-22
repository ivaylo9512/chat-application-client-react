import { configureStore } from '@reduxjs/toolkit';
import styles from 'app/slices/stylesSlice';
import MenuNav from 'components/MenuNav/MenuNav';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const store = configureStore({
    reducer: {
        styles
    }
})

describe('MenuNav integration tests', () => {
    const createWrapper = (route) => mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ route ]} initialIndex={0}>
                <MenuNav />
            </MemoryRouter>
        </Provider>
    ) 
    
    it('should update store on toggleSearch', () => {
        const wrapper = createWrapper('/searchChat')
        expect(store.getState().styles.isSearchHidden).toBe(false);
   
        wrapper.findByTestid('toggleSearch').at(0).simulate('click');

        expect(store.getState().styles.isSearchHidden).toBe(true);
    })

    it('should update store on toggleHeader', () => {
        const wrapper = createWrapper('/')
        expect(store.getState().styles.isHeaderHidden).toBe(true);
      
        wrapper.findByTestid('toggleHeader').at(0).simulate('click');

        expect(store.getState().styles.isHeaderHidden).toBe(false);
    })
})