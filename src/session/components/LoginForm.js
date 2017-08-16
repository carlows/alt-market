// @flow

import React from 'react';
import { connect } from 'react-redux';
import { LocalForm } from 'react-redux-form';
import { TextInput } from '../../common/components/';
import { required, email, minLength } from '../../common/validations';
import { login } from '../actions';

type DefaultProps = void;
type Props = Object;
type State = void;

class LoginForm extends React.Component<DefaultProps, Props, State> {
  handleSubmit(values: Object) {
    const { dispatch } = this.props;
    dispatch(login(values));
  }

  render() {
    return (
      <LocalForm onSubmit={this.handleSubmit.bind(this)}>
        <TextInput
          id="email"
          label="Email"
          model=".email"
          validators={{
            required,
            email
          }}
          messages={{
            required: 'Required field.',
            email: 'Should be a valid email'
          }}
        />
        <br />
        <TextInput
          type="password"
          id="password"
          label="Password"
          model=".password"
          validators={{
            required,
            minLength: minLength(8)
          }}
          messages={{
            required: 'Required field.',
            minLength: 'Should have at least 8 characters'
          }}
        />
        <br />
        <div>
          <button id="submit" type="submit">
            Login
          </button>
        </div>
      </LocalForm>
    );
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(LoginForm);
