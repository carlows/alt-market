// @flow

import React from 'react';
import { Errors, Control } from 'react-redux-form';

type DefaultProps = void;
type Props = {
  id: string,
  label: string,
  messages: Object,
  model: string,
  validators: Object
};
type State = void;

/**
 * a component to render a controlled text input, this component is
 * used to reduce boilerplate when writing inputs
 */
class TextInput extends React.PureComponent<DefaultProps, Props, State> {
  render() {
    const {
      id,
      label,
      model,
      messages,
      validators,
      ...otherProps
    } = this.props;

    const renderedLabel = (
      <label htmlFor={id}>
        {label}
      </label>
    );

    return (
      <div>
        {label && renderedLabel}
        <br />
        <Control.text
          {...otherProps}
          model={model}
          name="first_name"
          id={id}
          validators={validators}
        />
        <Errors
          model={model}
          component="div"
          show={{
            touched: true,
            focus: false
          }}
          messages={messages}
        />
      </div>
    );
  }
}

export default TextInput;
