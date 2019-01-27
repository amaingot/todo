import { shallow } from 'enzyme';
import * as React from 'react';

import Layout from '../Layout';

describe('[Component] Layout', () => {
  it('renders without error', () => {
    const wrapper = shallow(<Layout>Boom</Layout>);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
