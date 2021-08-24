import * as redux from 'react-redux';
import HeaderScroll from 'components/HeaderScroll/HeaderScroll';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import chats, { onChatsComplete } from 'app/slices/chatsSlice';
import styles, { toggleHeaderVisibility } from 'app/slices/stylesSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Scroll, Container } from 'components/HeaderScroll/HeaderScrollStyle';
import { chatsRequest } from 'app/slices/chatsSlice';
import 'jest-styled-components';

jest.mock('components/ChatList/ChatList', () => () => <div></div>);

const store = configureStore({
    reducer: {
        chats,
        styles
    },
    preloadedState: {
        chats:{
            data: {
                chats: [],
                isLastPage: false
            },
            query: {
                take: 2,
                direction: 'ASC',
            },
            isLoading: false
        }

    }
})

describe('HeaderScroll unit tests', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    }) 

    let styleMock = jest.fn();
    window.getComputedStyle = styleMock;

    beforeEach(() => {
        styleMock.mockReturnValue({ height: 5});
    })

    const createWrapper = () => mount(
        <Provider store={store}>
            <HeaderScroll />
        </Provider>
    )

    it('should remove resize handler on unmount and call getComputedStyles 2 times only on mount', async() => {
        const wrapper = createWrapper();
        wrapper.unmount();

        await act(async() => window.dispatchEvent(new Event('resize')));

        expect(styleMock).toHaveBeenCalledTimes(2);
    })

    it('should calculate padding on mount', () => {
        styleMock.mockReturnValueOnce({ height: 5}).mockReturnValueOnce({ height: 20});
        
        const wrapper = createWrapper();
        wrapper.update();

        expect(window.getComputedStyle).toHaveBeenCalledTimes(2);
        expect(wrapper.find(Container).prop('style')).toEqual({ paddingBottom: '15px' })
    })

    it('should calculate padding on resize', async() => {
        styleMock.mockReturnValueOnce({ height: 15}).mockReturnValueOnce({ height: 25})
            .mockReturnValueOnce({ height: 15}).mockReturnValueOnce({ height: 25})
            .mockReturnValueOnce({ height: 10}).mockReturnValueOnce({ height: 12});
      
        const wrapper = createWrapper();
        await act(async() => window.dispatchEvent(new Event('resize')));
        wrapper.update();

        expect(wrapper.find(Container).prop('style')).toEqual({ paddingBottom: '2px' })
    })

    it('should have right style with isHeaderHidden set to true', () => {
        const wrapper = createWrapper();

        expect(wrapper.find(Scroll)).toHaveStyleRule('margin-top', '-11vh')
    })

    it('should have right style with isHeaderHidden set to false', () => {
        store.dispatch(toggleHeaderVisibility());
        const wrapper = createWrapper();
    
        expect(wrapper.find(Scroll)).toHaveStyleRule('margin-top', '0')
    })

    it('should call scroll with values', () => {
        const wrapper = createWrapper();
        const scrollMock = jest.fn();

        wrapper.find(Container).props().onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: scrollMock }, deltaY: 10});

        expect(scrollMock).toHaveBeenCalledWith({behavior: 'smooth', left: 60, top: 10})
    })

    it('should not call dispatch not scrolled to the end', () => {
        const wrapper = createWrapper();

        wrapper.find(Container).props().onWheel({currentTarget: { scrollLeft: 10, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10});

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    it('should call dispatch with chatsRequest when isLoading is false and  + isLastPage is false and is scrolled to the end', () => {
        const wrapper = createWrapper();

        wrapper.find(Container).props().onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10});

        expect(dispatchMock).toHaveBeenCalledWith(chatsRequest({direction: 'ASC', take: 2}))
    })
    
    it('should not call dispatch when isLoading is false', () => {
        store.dispatch(chatsRequest());
        const wrapper = createWrapper();

        wrapper.find(Container).props().onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10});

        expect(dispatchMock).not.toHaveBeenCalled()
    })

    it('should not call dispatch when isLoading is false', () => {
        store.dispatch(onChatsComplete({pageable: { isLastPage: true, data: []}}));
        const wrapper = createWrapper();

        wrapper.find(Container).props().onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10});

        expect(dispatchMock).not.toHaveBeenCalled()
    })
});