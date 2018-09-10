import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPanels, clearPanelSaveStatus } from '../actions/panelActions';
import { clearError, loadTokenAndUser, validateToken, logOut } from '../actions/userActions';
import { NavLink } from "react-router-dom";

class Home extends Component {
  componentWillMount() {
    this.props.fetchPanels();
    this.props.clearPanelSaveStatus();
    this.props.clearError();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    // validateToken(token);

    // reiketu pries paleidziant patikrint ar tokenas tinkamas, bet turbut del async tas nepavyksta
    // atrodo sitai ispresta.Kodas perkeltas i userActions
    if((!this.props.user&&!this.props.token)&&(token&&user)){
      this.props.validateToken(token);
      // this.props.loadTokenAndUser();
      // const that = this;
      // // console.log('praeina');
      // // var tokenIsValid = 'dar ne';
      // async function checkToken() {
      //   const tokenIsValid = await validateToken(token);
      //   // console.log(tokenIsValid);
      //   await console.log('ar valid', tokenIsValid);
      //   if (tokenIsValid) {
      //     // console.log(tokenIsValid)
      //     that.props.loadTokenAndUser();
      //   }
      // }
      // checkToken();
      // console.log(checkToken());
      // if (checkToken()) {
      //   // console.log(tokenIsValid)
      //   this.props.loadTokenAndUser();
      // }
    }

    // if(!validateToken(token)) {
    //   this.props.logOut();
    // }
  }
//kaip perduoti props Link elementui https://www.youtube.com/watch?v=nmbX2QL7ZJc yra kitas video kur paaiskina kaip perduot route elemntui
  render() {
    const panelItems = this.props.panels.map(item => (
      <NavLink to={{pathname:'/panel/'+ item._id, state: {panel:item}}}>
        <div className="panel-card" key={item._id}>
          <img className="panel-img" src={item.url} alt={item.description}/>
          <h6 >Author: {item.author}</h6>
          <p >{item.description}</p>
        </div>
      </NavLink>
    ));
    return (
      <div>
        <h2>Our Panels</h2>
        <div className="panel-box">{panelItems}</div>
      </div>
    );
  }
}
  
const mapStateToProps = state => ({
  panels: state.panel.panels,
  user: state.user.user,
  token: state.user.token
});

export default connect(mapStateToProps, { fetchPanels, clearPanelSaveStatus, clearError, loadTokenAndUser, logOut, validateToken })(Home);