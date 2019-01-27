import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';

import CreateTodo, { CreateTodoProps } from '../CreateTodo';

describe('[Component] CreateTodo', () => {
  it('renders without error', () => {
    const props: CreateTodoProps = {
      inputValue: 'This is a cool todo, do it.',
      onInputChange: spy() as React.ChangeEventHandler<HTMLInputElement>,
      onInputKeyPress: spy() as React.KeyboardEventHandler<HTMLInputElement>,
      onCreate: spy() as () => void,
    };

    const wrapper = shallow(<CreateTodo {...props} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('onCreate is called when the button is clicked given input value', () => {
    const onCreateSpy = spy();

    const props: CreateTodoProps = {
      inputValue: 'This is a cool todo, do it.',
      onInputChange: spy() as React.ChangeEventHandler<HTMLInputElement>,
      onInputKeyPress: spy() as React.KeyboardEventHandler<HTMLInputElement>,
      onCreate: onCreateSpy as () => void,
    };

    const wrapper = mount(<CreateTodo {...props} />);
    wrapper.find('button').simulate('click');

    expect(onCreateSpy.callCount).toEqual(1);
  });

  it('onCreate is not called when the button is clicked given no input value', () => {
    const onCreateSpy = spy();

    const props: CreateTodoProps = {
      inputValue: '',
      onInputChange: spy() as React.ChangeEventHandler<HTMLInputElement>,
      onInputKeyPress: spy() as React.KeyboardEventHandler<HTMLInputElement>,
      onCreate: onCreateSpy as () => void,
    };

    const wrapper = mount(<CreateTodo {...props} />);
    wrapper.find('button').simulate('click');

    expect(onCreateSpy.callCount).toEqual(0);
  });
});
