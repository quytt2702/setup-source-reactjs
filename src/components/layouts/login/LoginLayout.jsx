import React, { Component } from 'react';

export default class LoginLayout extends Component {
  render() {
    return (
      <section className='login-layout'>
        {this.props.children}
      </section>
    );
  }
}
