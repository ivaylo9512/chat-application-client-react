import Enzyme, { ShallowWrapper, ReactWrapper } from "enzyme";
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

function findByTestid(testid) {
  return this.find(`[data-testid="${testid}"]`)
}

ReactWrapper.prototype.findByTestid = findByTestid;
ShallowWrapper.prototype.findByTestid = findByTestid;


