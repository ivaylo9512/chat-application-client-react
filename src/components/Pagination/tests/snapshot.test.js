import { shallow } from 'enzyme';
import Pagination from 'components/Pagination/Pagination';
import * as Redux from 'react-redux';

describe('Pagination snapshot tests', () => {
    let selectorSpy;

    beforeEach(() => {
        selectorSpy = jest.spyOn(Redux, 'useSelector');
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);

        return shallow(<Pagination getData={jest.fn()} pagesPerSlide={5}/>)
    }

    it('renders correctly with pages', () => {
        const wrapper = createWrapper({ dataInfo: { maxPages: 5, currentPage: 1, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly without pages', () => {
        const wrapper = createWrapper({ dataInfo: { maxPages: 0, currentPage: 0, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly with pages at page 2 and back button', () => {
        const wrapper = createWrapper({ dataInfo: { data: [], maxPages: 5, currentPage: 2, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly with page that is last page of slide should render next slide', () => {
        const wrapper = createWrapper({ dataInfo: { data: [], maxPages: 10, currentPage: 5, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly with pages at last page', () => {
        const wrapper = createWrapper({ dataInfo: { data: [], properties: [], maxPages: 4, currentPage: 4, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

})