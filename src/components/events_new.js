import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// import { postEvents } from '../actions';

class EventsNew extends Component {
  render() {
    return (
      <React.Fragment>
        <div>新規作成画面</div>
      </React.Fragment>
    )
  }
}

// const mapDispatchToProps = dispatch => ({ postEvent })

// connect: stateとactionをcomponentに関連付ける
export default connect(null, null)(EventsNew)
