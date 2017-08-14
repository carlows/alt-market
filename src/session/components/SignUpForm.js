// @flow

import React from 'react';
import { connect } from 'react-redux';
import { LocalForm } from 'react-redux-form';
import { TextInput } from '../../common/components/';
import { required, email, minLength } from '../../common/validations';
import { signUp } from '../actions';

type DefaultProps = void;
type Props = Object;
type State = void;

/**
 * component to render a signup form and handle its submition
 */
class SignUpForm extends React.Component<DefaultProps, Props, State> {
  handleSubmit = (values: Object) => {
    const { signUp } = this.props;
    signUp(values);
  };

  render() {
    return (
      <LocalForm onSubmit={this.handleSubmit}>
        <TextInput
          id="first-name"
          label="Firstname"
          model=".firstName"
          validators={{
            required
          }}
          messages={{
            required: 'Required field.'
          }}
        />
        <br />
        <TextInput
          id="last-name"
          label="Lastname"
          model=".lastName"
          validators={{
            required
          }}
          messages={{
            required: 'Required field.'
          }}
        />
        <br />
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
            SignUp
          </button>
        </div>
      </LocalForm>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(signUp(values))
});

export default connect(null, mapDispatchToProps)(SignUpForm);
