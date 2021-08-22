import { shallow } from 'enzyme';
import Menu from 'components/Menu/Menu';
import { MenuCircle } from 'components/Menu/MenuStyles';

describe('Menu snapshot tests', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(
            <Menu />
        )
    })
    
    it('should match snapshot with isMenuHidden to true', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with isMenuHidden to false', () => {
        wrapper.find(MenuCircle).simulate('click');
        expect(wrapper).toMatchSnapshot();
    })

})