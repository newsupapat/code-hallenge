import React from 'react'
import { Field, reduxForm } from 'redux-form'

import './section/createStyle.css'
const Create = props => {
  const { handleSubmit } = props
  const submit = values => {
    // print the form values to the console
    console.log(values)
    alert(values)
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <Field name='firstName' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name</label>
        <Field name='lastName' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <Field name='email' component='input' type='email' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

let ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(Create)

export default ContactForm
