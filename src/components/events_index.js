import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { readEvents, increment, decrement } from '../actions';

class EventsIndex extends Component {
  // componentがマウント時に実行されるコールバック
  componentDidMount() {
    // 外部のAPIサーバーに対してデータを取りに行く処理を実行する
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event.id}`} >
            {event.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    }
    return (
      <React.Fragment>
        <FloatingActionButton style={style} containerElement={<Link to="/events/new" />}>
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Body</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          { this.renderEvents() }
          </TableBody>
        </Table>
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
