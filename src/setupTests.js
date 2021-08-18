import Enzyme, { ShallowWrapper, ReactWrapper } from "enzyme";
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const findByTestid = function (testid) {
  return this.find(`[data-testid="${testid}"]`)
}

ReactWrapper.prototype.findByTestid = findByTestid;
ShallowWrapper.prototype.findByTestid = findByTestid;


