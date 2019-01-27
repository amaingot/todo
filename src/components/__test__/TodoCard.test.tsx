import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';

import TodoCard, { TodoCardProps } from '../TodoCard';

describe('[Component] TodoCard', () => {
  it('renders without error', () => {
    const props: TodoCardProps = {
      divider: true,
      item: {
        id: 'abc123',
        description: 'A great todo',
        done: false,
      },
      onCheckBoxToggle: spy() as () => void,
      onDeleteClick: spy() as () => void,
    };

    const wrapper = shallow(<TodoCard {...props} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('delete is called when clicked', () => {
    const deleteSpy = spy();
    const props: TodoCardProps = {
      divider: true,
      item: {
        id: 'abc123',
        description: 'A great todo',
        done: false,
      },
      onCheckBoxToggle: spy() as () => void,
      onDeleteClick: deleteSpy as () => void,
    };

    const wrapper = mount(<TodoCard {...props} />);
    wrapper.find('button').simulate('click');

    expect(deleteSpy.callCount).toEqual(1);
  });

  it('complete is called when clicked', () => {
    const checkboxSpy = spy();
    const props: TodoCardProps = {
      divider: true,
      item: {
        id: 'abc123',
        description: 'A great todo',
        done: false,
      },
      onCheckBoxToggle: checkboxSpy as () => void,
      onDeleteClick: spy() as () => void,
    };

    const wrapper = mount(<TodoCard {...props} />);
    wrapper.find('input[type="checkbox"]').simulate('click');

    expect(checkboxSpy.callCount).toEqual(1);
  });
});
