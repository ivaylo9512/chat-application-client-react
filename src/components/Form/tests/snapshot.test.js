import { shallow } from 'enzyme';
import Form from 'components/Form/Form';
import * as Redux from 'react-redux';

describe('Pagination snapshot tests', () => {
    beforeEach(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());
    })
    const createWrapper = (state) => {
        jest.spyOn(Redux, 'useSelector').mockReturnValue(state);

        return shallow(<Form />)   
    }

    it('should call dispatch on submit', () => {})
    it('should render snanpshot', () => {
        const wrapper = createWrapper(true);

        expect(wrapper).toMatchSnapshot();
    })

    it('should render snanpshot with false', () => {
        const wrapper = createWrapper(false);

        expect(wrapper).toMatchSnapshot();
    })
});