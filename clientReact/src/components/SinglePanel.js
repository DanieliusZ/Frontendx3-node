import React, { Component } from 'react';

//galima perdaryt butu i function component
class SinglePanel extends Component {

  render() {
      console.log(this.props)
    return (
        <div>
            <p>Single Panel Works</p>
            <div className="panel-card" key={this.props.location.state.panel._id}>
                <img className="panel-img" src={this.props.location.state.panel.url} alt={this.props.location.state.panel.description}/>
                <h6 >Author: {this.props.location.state.panel.author}</h6>
                <p >{this.props.location.state.panel.description}</p>
            </div>
        </div>
    );
  }
}


export default SinglePanel;