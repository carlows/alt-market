import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  _onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  _onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  _onLogin = () => {
    const { email, password } = this.state;

    this.props.login(email, password);
  }

  render() {
    return (
      <div>
        <p>Email</p>
        <input value={this.state.email} onChange={this._onEmailChange} />
        <br />
        <p>Password</p>
        <input value={this.state.password} onChange={this._onPasswordChange} />
        <br />
        <button onClick={this._onLogin}>Login</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login({ email, password }))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
