import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../actions/userActions'

class ErrorMsg extends Component {
  onClearError() {
    this.props.clearError();
  }

  render() {
    return (       
      <div> {this.props.error && <p className="danger">{this.props.error}<span className="float-right" onClick={this.onClearError.bind(this)}>X</span></p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.errorMsg,
});

export default connect(mapStateToProps, { clearError })(ErrorMsg);