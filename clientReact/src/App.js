import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
// import Core from './components/Core'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import NewPanel from './components/NewPanel'
import ErrorField from './components/ErrorField'
import SinglePanel from './components/SinglePanel'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
                  {/* <Core /> */}
        <Router>
          <div>
            <Navbar />
            <ErrorField />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/newpanel" component={NewPanel} />
            <Route path="/panel/:id" component={SinglePanel}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
