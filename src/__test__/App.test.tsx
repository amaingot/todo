import { shallow } from 'enzyme';
import * as React from 'react';

import App from '../App';

describe('[Component] App', () => {
  it('renders without error', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
