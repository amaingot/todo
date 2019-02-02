import * as React from 'react';

import { Checkbox } from '@material-ui/core';

interface Props {
  checked: boolean;
  toggleCheck: () => void;
}

class TodoCheckbox extends React.Component<Props> {
  public render() {
    const { checked, toggleCheck } = this.props;
    return <Checkbox onClick={toggleCheck} checked={checked} />;
  }
}

export default TodoCheckbox;
