import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.history.push('/')
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.handleLogin.bind(this)} action="javascript:void(0)" noValidate disabled>
        <h2 className='form-title'>Login Form</h2>
        <div className='wrap-input'>
          <input className='input-form' type='text' placeholder='Username' value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>
        </div>
        <div className='wrap-input'>
          <input className='input-form' type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
        </div>
        <div className='wrap-remember'></div>
        <div className='wrap-button'>
          <button className='btn-main' type='submit'>Login</button>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm)
