import React from 'react'
import { Field, reduxForm } from 'redux-form'
import MonacoEditor from 'react-monaco-editor'

import './section/createStyle.css'
const options = {
  fontSize: '14px',
  automaticLayout: true,
  mouseWheelScrollSensitivity: 0.5,
  minimap: {
    enabled: false
  },
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  scrollbar: {
    // Subtle shadows to the left & top. Defaults to true.
    useShadows: false,
    vertical: 'visible',
    horizontal: 'visible',

    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 3
  }
}
const Create = props => {
  const { handleSubmit } = props
  const submit = values => {
    // print the form values to the console
    console.log(values)
    alert(JSON.stringify(values))
  }
  const onChange = (newValue, e) => {
    console.log("onChange", newValue, e);
    // this.props.UpdateCode(newValue);
  };
  return (
    <div className='ui container' style={{ marginTop: '10%' }}>
      <form className='ui form' onSubmit={handleSubmit(submit)}>
        <div className='field'>
          <label>Header</label>
          <Field name='firstName' component='input' type='text' />
        </div>
        <div className='field'>
          <label>Sub Headers</label>
          <Field name='lastName' component='input' type='text' />
        </div>
        <div className='field'>
          <label>Description</label>
          <Field name='Description' component='textarea' />
        </div>
        <MonacoEditor
          width='100%'
          height='400px'
          language={'c'}
          theme='vs-dark'
          value={'Code C'}
          options={options}
          onChange={onChange}
        />
        <button className='ui button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

let ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(Create)

export default ContactForm
