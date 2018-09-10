import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logOut, validateToken, loadTokenAndUser } from '../actions/userActions'
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  componentWillMount () {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if((!this.props.user&&!this.props.token)&&(token&&user)){
      this.props.validateToken(token);
    }
  }

  onLogOut () {
    this.props.history.push('/');
    this.props.logOut();
  }

  render() {
    return (
        <div className="navbar">
          <ul className="float-left">
            <li className="nav-item"><NavLink to="/">Home</NavLink></li>
          </ul>           
          { this.props.user ?
            <ul className="float-right">
              <li className="nav-item"><NavLink to="/newpanel">Create New Panel</NavLink></li>
              <li className="nav-item" onClick={this.onLogOut.bind(this)}>Logout</li>
            </ul> :
            <ul className="float-right">
              <li className="nav-item"><NavLink to="/login">Login</NavLink></li>
              <li className="nav-item"><NavLink to="/register">Register</NavLink></li>
            </ul>
          }
          { this.props.user &&
            <ul>
              <li>Welcome {this.props.user.email}</li>
            </ul>
          }

        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default withRouter(connect(mapStateToProps, { logOut, validateToken, loadTokenAndUser })(Navbar));