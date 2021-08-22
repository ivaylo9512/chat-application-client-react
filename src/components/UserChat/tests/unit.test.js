import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UserChat from 'components/UserChat/UserChat';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { Info } from 'components/UserChat/UserChatStyle';
import 'jest-styled-components';

const userChat = {id: 1, createdAt:'2021-08-22', secondUser: { profileImage: 'image.png', firstName: 'firstname', lastName: 'lastName' }};
describe('UserChat unit tests', () => {
    let wrapper;
    let mockDispatch = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);

        wrapper = shallow(<UserChat userChat={userChat}/>);
    })

    it('should call dispatch with setCurrentChat', () => {
        wrapper.findByTestid('setChat').simulate('click');

        expect(mockDispatch).toHaveBeenCalledWith(setCurrentChat(userChat));
    })

    it('should not render Info with isInfoVisible to false', async() => {
        expect(wrapper.find(Info)).toHaveStyleRule('display', 'none');
    })

    it('should render Info with isInfoVisible to true', () => {
        wrapper.findByTestid('toggleInfo').simulate('click');
        expect(wrapper.find(Info)).toHaveStyleRule('display', 'flex');
    })
})