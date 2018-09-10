import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions'
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const login = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(login);
  }

  render() {
    if(this.props.user){
      return (<Redirect to="/"/>)
    }

    return (
      <div>
      <h1>Login</h1>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Email: </label>
          <br />
          <input
            type="text"
            name="email"
            onChange={this.onChange}
            value={this.state.title}
          />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <br />
          <input
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { loginUser })(Login);