import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'

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
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
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
    return (
      <React.Fragment>
        <div>イベント詳細</div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field lavel="Title" name="title" type="text" component={this.renderField}/>
            <Field lavel="Body" name="body" type="text" component={this.renderField}/>

            <div>
             <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
             <Link to="/">Cancel</Link>
             <Link to="/" onClick={this.onDeleteClick} >Delete</Link>
            </div>
          </div>
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
