import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveNewPanel } from '../actions/panelActions'
import { Redirect } from "react-router-dom";

class NewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      description: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // this.props.loadToken();

    const newPanel = {
      author: this.props.user.email,
      url: this.state.imageURL,
      description: this.state.description
    };

    this.props.saveNewPanel(newPanel, this.props.token);
  }

  render() {
    if(this.props.panelSaved){
      return (<Redirect to="/"/>)
    }

    if(!this.props.user){
      return (<Redirect to="/login"/>)
    }

    return (
      <div>
      <h1>Create New Panel</h1>
      <form onSubmit={this.onSubmit}>
        {this.state.imageURL.length>10 && <img className="panel-img" src={this.state.imageURL} alt="No preview available"/>}
        <br />
        <div>
          <label>Image URL: </label>
          <br />
          <input
            type="text"
            name="imageURL"
            onChange={this.onChange}
            value={this.state.imageURL}
          />
        </div>
        <br />
        <div>
          <label>Description: </label>
          <br />
          <input
            type="textarea"
            name="description"
            onChange={this.onChange}
            value={this.state.description}
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
  user: state.user.user,
  token: state.user.token,
  panelSaved: state.panel.panelSaved
});

export default connect(mapStateToProps, { saveNewPanel })(NewPanel);