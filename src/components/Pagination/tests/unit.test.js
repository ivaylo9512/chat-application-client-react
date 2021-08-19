import { shallow } from 'enzyme';
import Pagination from '../Pagination';
import * as redux from 'react-redux';
import { userChatsRequest, setCurrentUserChats } from 'app/slices/userChatsSlice';
import { Li } from '../PaginationStyle';

describe('Pagination unit tests', () => {
    let selectorSpy;
    let dispatchMock = jest.fn();

    const createWrapper = (value) => {
        selectorSpy.mockReturnValue(value);
    
        return shallow(<Pagination getData={userChatsRequest} setData={setCurrentUserChats} pagesPerSlide={5}/>)
    }

    beforeEach(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    it('should render 5 Li pages', () => {
        const wrapper = createWrapper({dataInfo: { data:[], pages: 5, maxPages: 5}, query: { take: 2, name: '' }});

        expect(wrapper.find(Li).length).toBe(5);
    })

    it('should render 5 Li pages when page exceed pagesPerSlice', () => {
        const wrapper = createWrapper({dataInfo: { data:[], pages: 10, maxPages: 5}, query: { take: 2, name: '' }});

        expect(wrapper.find(Li).length).toBe(5);
    })

    
    it('should not render back button at 1st page', () => {
        const wrapper = createWrapper({dataInfo: { data:[], pages: 10, maxPages: 5}, query: { take: 2, name: '' }});

        expect(wrapper.findByTestid('back').length).toBe(0);
    })

    it('should not render next button at last page', () => {
        const wrapper = createWrapper({dataInfo: { data:[], pages: 5, maxPages: 5}, query: { take: 2, name: '' }});
        wrapper.findByTestid(5).simulate('click');

        expect(wrapper.findByTestid('next').length).toBe(0);
    })

    it('should dispatch getChats', () => {
        const wrapper = createWrapper({dataInfo: { data:[], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(userChatsRequest({take: 2, name: '', pages: 1}));
    })

    it('should dispatch setChats', () => {
        const wrapper = createWrapper({dataInfo: { data:[['data1'], ['data2']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentUserChats(['data2']));
    })

    it('should dispatch getChats with next button', () => {
        const wrapper = createWrapper({dataInfo: { data:[['data1']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid('next').simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(userChatsRequest({take: 2, name: '', pages: 1}));
    })

    it('should dispatch setChats with back button', () => {
        const wrapper = createWrapper({dataInfo: { data:[['data1'], ['data2']], pages: 2, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).simulate('click');
        wrapper.findByTestid('back').simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentUserChats(['data1']));
    })

    it('should dispatch getChats with 4 pages when at 1st page and requesting 5th page', () => {
        const wrapper = createWrapper({dataInfo: { data:[['data1']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(userChatsRequest({take: 2, name: '', pages: 4}));
    })

    it('should dispatch getChats with 3 pages when rquesting 5th at 1st page and 2nd page is already present', () => {
        const wrapper = createWrapper({dataInfo: { data:[['data1'], ['data2']], pages: 2, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(userChatsRequest({take: 2, name: '', pages: 3}));
    })

    it('should dispatch getChats with 2 pages when rquesting 5th at 1st page and 3 page is already present', () => {
        const wrapper = createWrapper({dataInfo: { data:[['data1'], ['data2'], ['data3']], pages: 3, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(userChatsRequest({take: 2, name: '', pages: 2}));
    })
})