import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'

import { readEvents, increment, decrement } from '../actions';

class EventsIndex extends Component {
  // componentがマウント時に実行されるコールバック
  componentDidMount() {
    // 外部のAPIサーバーに対してデータを取りに行く処理を実行する
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
          { this.renderEvents() }
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}
// mapStateToProps: stateの情報からcomponentに必要なものを取り出して、component内のpropsとしてマッピングする機能をもつ
const mapStateToProps = state => ({ events: state.events })

// mapDispatchToProps:
// dispatch関数: あるactionが発生したときにreducerにtypeに応じた状態遷移を実行させるための関数
const mapDispatchToProps = dispatch => ({
  readEvents: () => dispatch(readEvents())
})

// connect: stateとactionをcomponentに関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
