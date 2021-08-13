import React from 'react';
import ReactDOM from 'react-dom';
import Register from '../../Register';

import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getRegisterRequest } from '../../../../app/slices/authenticateSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../../../app/slices/authenticateSlice');

const setup = ({ totalCost }) => {
    getRegisterRequest.mockReturnValue(totalCost);
};

describe("RegisterSnapshotTests", () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    
      afterAll(() => {
        jest.restoreAllMocks();
      });
      
    it('renders correctly enzyme', () => {

        getRegisterRequest.mockReturnValue({isLoading: false, error: null});

        const wrapper = shallow(<Register />)
    
        expect(toJson(wrapper)).toMatchSnapshot();
  });
});