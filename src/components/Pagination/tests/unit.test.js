import { shallow } from 'enzyme';
import Pagination from '../Pagination';
import * as redux from 'react-redux';
import { userChatsRequest, setCurrentUserChats } from 'app/slices/userChatsSlice';

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
})