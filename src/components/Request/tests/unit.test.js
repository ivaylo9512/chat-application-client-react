import * as redux from 'react-redux';
import { mount } from 'enzyme';
import Request from 'components/Request/Request';
import { Info } from 'components/Request/RequestStyle';
import 'jest-styled-components';
import { Error } from 'components/Request/RequestStyle';
import { act } from 'react-dom/test-utils';

jest.mock('components/RequestButtons/RequestButtons', () => () => <div></div>)

describe('Request unit tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return mount(
            <Request request={{ id: 5, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}}/>
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

        expect(wrapper.find(Info)).toHaveStyleRule('display', 'flex');
    })

    it('should render error', () => {
        const wrapper = createWrapper('Request not found.');
      
        expect(wrapper.find(Error).text()).toBe('Request not found.');
    })
})