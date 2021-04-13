import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error }} = field

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    // 履歴にトップを追加する
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  render() {
    // pristine: 何も手が付けられていない状態を示す属性
    // submitting: 連打防止。
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <React.Fragment>
        <div>イベント詳細</div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field label="Title" name="title" type="text" component={this.renderField}/>
            <Field label="Body" name="body" type="text" component={this.renderField}/>

            <RaisedButton label="Submit" type="submit" style={style} cotainerElement={<Link to="/" />} />
            <RaisedButton label="DELETE" type="submit" style={style} onClick={this.onDeleteClick} />
            <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
        </form>
      </React.Fragment>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

const mapStateToProp = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

// connect: stateとactionをcomponentに関連付ける
export default connect(mapStateToProp, mapDispatchToProps)(
  // enableReinitialize : trueにすると、initialValuesが更新される度に初期化される
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true})(EventsShow)
)
