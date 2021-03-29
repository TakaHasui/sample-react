import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

async onSubmit(values) {
  await this.props.postEvent(values)
  this.props.history.push('/')
}

  render() {
    // pristine: 何も手が付けられていない状態を示す属性
    // submitting: 連打防止。
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }
    return (
      <React.Fragment>
        <div>新規作成画面</div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field lavel="Title" name="title" type="text" component={this.renderField}/>
            <Field lavel="Body" name="body" type="text" component={this.renderField}/>

            <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
            <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
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
