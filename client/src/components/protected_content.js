import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProtectedContent extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
  	console.log('this.props', this.props);
    return (
    	<div>
    	<h1>Email: Anything</h1>

      <div className="msg">{this.props.message}</div>
      	</div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(ProtectedContent);
