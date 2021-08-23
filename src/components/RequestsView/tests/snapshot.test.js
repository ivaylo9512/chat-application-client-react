import RequestView from 'components/RequestsView/RequestsView';
import { shallow } from 'enzyme';

describe('RequestView snapshot tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <RequestView />
        )
    })
    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})