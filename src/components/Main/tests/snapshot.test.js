import Main from 'components/Main/Main';
import { shallow } from 'enzyme';

describe('Main snapshot tests', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Main />
        )
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
})