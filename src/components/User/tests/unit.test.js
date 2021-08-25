import * as redux from 'react-redux';
import User from 'components/User/User'
import { mount } from 'enzyme';
import { Error, Info } from 'components/User/UserStyle';
import 'jest-styled-components';
import { act } from 'react-dom/test-utils';

jest.mock('components/RequestButtons/RequestButtons', () => () => <div></div>)

describe('User unit tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return mount(
            <User user={{ id: 5, firstName: 'First', lastName: 'Last', profilePicture: 'image.png'}}/>
        )
    }

    it('should render Info with display none when isInfoVisible is false', async() => {
        const wrapper = createWrapper();
      
        expect(wrapper.find(Info)).toHaveStyleRule('display', 'none');
    })

    it('should render Info with display flex when isInfoVisible is true', async() => {
        const wrapper = createWrapper();
        await act(async () => wrapper.findByTestid('toggleInfo').find('button').props().onClick());
        wrapper.update();
    
        expect(wrapper.find(Info).prop('isInfoVisible')).toBe(true);
        expect(wrapper.find(Info)).toHaveStyleRule('display', 'flex');
    })

    it('should render error', () => {
        const wrapper = createWrapper('Request not found.');
      
        expect(wrapper.find(Error).text()).toBe('Request not found.');
    })
})