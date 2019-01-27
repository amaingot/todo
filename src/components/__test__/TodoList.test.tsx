import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';

import TodoList, { TodoListProps } from '../TodoList';

describe('[Component] TodoList', () => {
  it('renders without error', () => {
    const props: TodoListProps = {
      items: [
        {
          id: '123abc',
          description: 'blah',
          done: false,
        },
      ],
      deleteTodo: spy(),
      toggleTodo: spy(),
    };

    const wrapper = shallow(<TodoList {...props} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('delete is called when clicked and passes correct id', () => {
    const deleteSpy = spy();
    const props: TodoListProps = {
      items: [
        {
          id: '123abc',
          description: 'blah',
          done: false,
        },
      ],
      deleteTodo: deleteSpy,
      toggleTodo: spy(),
    };

    const wrapper = mount(<TodoList {...props} />);
    wrapper.find('button').simulate('click');

    expect(deleteSpy.callCount).toEqual(1);
    expect(deleteSpy.lastCall.args[0]).toEqual(0);
  });

  it('complete is called when clicked and passes correct id', () => {
    const checkboxSpy = spy();
    const props: TodoListProps = {
      items: [
        {
          id: '123abc',
          description: 'blah',
          done: false,
        },
      ],
      deleteTodo: spy(),
      toggleTodo: checkboxSpy,
    };

    const wrapper = mount(<TodoList {...props} />);
    wrapper.find('input[type="checkbox"]').simulate('click');

    expect(checkboxSpy.callCount).toEqual(1);
    expect(checkboxSpy.lastCall.args[0]).toEqual(0);
  });
});
