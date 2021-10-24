import RequestView from 'components/RequestsView/RequestsView';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('RequestView snapshot tests', () => {
    let wrapper;

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        wrapper = shallow(
            <RequestView />
        )
    }

    it('should match snapshot', () => {
        createWrapper({ isLoading: false });

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with loading request', () => {
        createWrapper({ isLoading: true });

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with error', () => {
        createWrapper({ isLoading: false, error: 'Unavailable' });

        expect(wrapper).toMatchSnapshot();
    })
})