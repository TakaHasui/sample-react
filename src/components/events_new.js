import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'

import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

async onSubmit(values) {
  await this.props.postEvent(values)
  this.props.history.push('/')
}

  render() {
    const { handleSubmit } = this.props
    return (
      <React.Fragment>
        <div>新規作成画面</div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field lavel="Title" name="title" type="text" component={this.renderField}/>
            <Field lavel="Body" name="body" type="text" component={this.renderField}/>

            <div>
             <input type="submit" value="Submit" disabled={false} />
             <Link to="/">Cancel</Link>
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

const mapDispatchToProps = ({ postEvent })

// connect: stateとactionをcomponentに関連付ける
export default connect(null, mapDispatchToProps)(
  // Error: Field must be inside a component decorated with reduxForm()
  reduxForm({ validate, form: 'eventNewForm'})(EventsNew)
)
