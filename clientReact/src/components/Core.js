import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
// import store from './store';
// import './App.css';
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import NewPanel from './NewPanel'
import ErrorField from './ErrorField'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    this.props.user
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !this.props.user
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class Core extends Component {
    
  render() {
    return (
      <Router>
        <div>
            <Navbar />
            <ErrorField />
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/newpanel" component={NewPanel} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { })(Core)
