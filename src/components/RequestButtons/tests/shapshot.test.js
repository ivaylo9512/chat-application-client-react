import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import RequestButtons from 'components/RequestButtons/RequestButtons';
import reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom')

const chatWithUser = {id: 1, lastMessage: 'last message', secondUser: { firstName: 'first', lastName: 'last', profileImage: 'image1.png'} };
describe('RequestButtons snapshot tests', () => {

    beforeEach(() => {
        reactRouterDom.useHistory = jest.fn();
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state, data) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(
            <RequestButtons requestId={data.requestId} userId={data.userId} initialMessage={data.initialMessage} chatWithUser={data.chatWithUser}/>
        )
    }

    it('should match snapshot with accept state', () => {
        const wrapper = createWrapper(undefined, { requestId: 1, userId: 2, initialMessage: 'accept', chatWithUser: null})

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with accept state and loading request', () => {
        const wrapper = createWrapper({ id: 2, state: 'accept', isLoading: true }, { requestId: null, userId: 2, initialMessage: 'accept', chatWithUser: null})

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with complete state', () => {
        const wrapper = createWrapper(undefined, { requestId: 1, userId: 2, initialMessage: 'completed', chatWithUser: null})

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with send state', () => {
        const wrapper = createWrapper(undefined, { requestId: 1, userId: 2, initialMessage: 'send', chatWithUser: null})

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with pending state', () => {
        const wrapper = createWrapper(undefined, { requestId: 1, userId: 2, initialMessage: 'pending', chatWithUser: null})

        expect(wrapper).toMatchSnapshot();
    })
})