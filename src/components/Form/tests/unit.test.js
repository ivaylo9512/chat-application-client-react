import * as redux from 'react-redux';
import Form from 'components/Form/Form'
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { resetUserChatsState, getUserChatsQuery, userChatsRequest } from 'app/slices/userChatsSlice';
import { FormNode } from '../FormStyle'

describe('Form unit tests', () => {
    let dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(<Form action={userChatsRequest} resetState={resetUserChatsState} selector={getUserChatsQuery} placeholder={'search chat'}/>);
    }

    it('should render snanpshot with true', () => {
        const wrapper = createWrapper(false);
        expect(wrapper).toHaveStyleRule('margin-bottom', '0')
    })

    it('should render snanpshot with false', () => {
        const wrapper = createWrapper(true);
        expect(wrapper).toHaveStyleRule('margin-bottom', '-26vh')
    })

    it('should dispatch resetState with changed input value', async() => {
        const wrapper = createWrapper(true);

        wrapper.find(FormNode).props().onSubmit({ preventDefault: jest.fn() });
        expect(dispatchMock).toHaveBeenNthCalledWith(1, resetUserChatsState());
        expect(dispatchMock).toHaveBeenNthCalledWith(2, userChatsRequest({name: '', pages: 1}));
    })

    it('should dispatch resetState and action', async() => {
        const wrapper = createWrapper(true);


        wrapper.find('input').simulate('change', { target: { value: 'change' }});
        wrapper.find(FormNode).props().onSubmit({ preventDefault: jest.fn() });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, userChatsRequest({name: 'change', pages: 1}));
    })

    it('should render input with passed placeholder', () => {
        const wrapper = createWrapper(false);
        expect(wrapper.find('input').prop('placeholder')).toBe('search chat');
    })
})