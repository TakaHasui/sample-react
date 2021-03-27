import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';

class App extends Component {
  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div>value: { props.value }</div>
        <button onClick={props.increment}>+1</button>
        <button onClick={props.decrement}>-1</button>
      </React.Fragment>
    )
  }
}
// mapStateToProps: stateの情報からcomponentに必要なものを取り出して、component内のpropsとしてマッピングする機能をもつ
const mapStateToProps = state => ({ value: state.count.value })

// mapDispatchToProps:
// dispatch関数: あるactionが発生したときにreducerにtypeに応じた状態遷移を実行させるための関数
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
})
// 省略した書き方
// const mapDispatchToProps = ({ increment, decrement })

// connect: stateとactionをcomponentに関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(App)
