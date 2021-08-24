import * as redux from 'react-redux';
import HeaderScroll from 'components/HeaderScroll/HeaderScroll';
import { shallow } from 'enzyme';

describe('HeaderScroll snapshot tests', () => {
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    }) 

    const createWrapper = (hiddenState, chatsState) => {
        jest.spyOn(redux, 'useSelector').mockReturnValueOnce(hiddenState)
            .mockReturnValueOnce(chatsState);
            
        return shallow(
            <HeaderScroll />
        )
    }

    it('should match snapshot', () => {
        const wrapper = createWrapper(true, { isLoading: false, data: { isLastPage: true }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot', () => {
        const wrapper = createWrapper(false, { isLoading: false, data: { isLastPage: true }});

        expect(wrapper).toMatchSnapshot();
    })
})