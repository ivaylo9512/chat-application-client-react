import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import ReactWrapper from 'enzyme/ShallowWrapper'
import ShallowWrapper from "enzyme/ReactWrapper";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const findByTestid = function (testid) {
  return this.find(`[data-testid="${testid}"]`)
}

ReactWrapper.prototype.findByTestid = findByTestid;
ShallowWrapper.prototype.findByTestid = findByTestid;


