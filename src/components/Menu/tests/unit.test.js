import { shallow } from 'enzyme';
import Menu from 'components/Menu/Menu';
import { MenuContainer, MenuCircle } from 'components/Menu/MenuStyles';
import 'jest-styled-components';

describe('Menu unit tests', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(
            <Menu />
        )
    })

    it('should translate with isMenuHidden to true', () => {
        expect(wrapper.find(MenuContainer)).toHaveStyleRule('width', '0%');
        expect(wrapper.find(MenuCircle)).toHaveStyleRule('transition', 'transform 2s 1.75s');
        expect(wrapper.find(MenuCircle)).toHaveStyleRule('transform', 'translate(7vw,-7vw)');
    })

    it('should translate with isMenuHidden to false', () => {
        wrapper.find(MenuCircle).props().onClick();

        expect(wrapper.find(MenuContainer)).toHaveStyleRule('width', '27%');
        expect(wrapper.find(MenuCircle)).toHaveStyleRule('transition', 'transform 2s');
        expect(wrapper.find(MenuCircle)).toHaveStyleRule('transform', 'translate(0,0)');
    })
})