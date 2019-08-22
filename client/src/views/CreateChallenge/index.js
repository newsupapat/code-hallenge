import React, { useState } from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import MonacoEditor from 'react-monaco-editor'
import { Dropdown, Button, Icon, Header, Segment } from 'semantic-ui-react'
import validate from './section/validate'
import axiosHeader from 'axiossecure'

//Components
import HeaderNav from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'

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
const lang = ['Javascript', 'C', 'Python']
const stateOptions = lang.map(lan => {
  return {
    key: lan,
    text: lan,
    value: lan
  }
})
const Create = props => {
  const { handleSubmit, submitting,...rest } = props
  const [lang, setlang] = useState('C')
  const [codes, setcodes] = useState({})
  const submit = async values => {
    values.codes = codes
    console.log(values)
    try {
      const res = axiosHeader.post('/api/problem',values)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    console.log(values)
    alert(JSON.stringify(values))
  }
  const onselectlang = (e, { value }) => {
    setlang(value)
  }
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      )
    }
  }
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    console.log(meta.error)
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {renderError(meta)}
      </div>
    )
  }
  const renderTextArea = ({ input, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <div>
          <textarea {...input} rows='5' cols='20' />
          {renderError(meta)}
        </div>
      </div>
    )
  }
  const onChange = (newValue, e) => {
    // console.log('onChange', newValue, e)
    let newcodes = codes
    newcodes[lang].code = newValue
    console.log(newcodes)
    setcodes(newcodes)
    // setcodes(cod)
    // this.props.UpdateCode(newValue);
  }
  const valueSelect = () => {
    console.log(codes[lang])
    if (codes[lang] && codes[lang].code) return codes[lang].code
    else {
      let newcodes = codes
      newcodes[lang] = { code: `Language ${lang} Welcome` }
      setcodes(newcodes)
      return `Language ${lang} Welcome`
    }
  }
  const renderTask = ({ fields, meta: { error, submitFailed } }) => (
    <Segment>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Button
            animated='vertical'
            onClick={() => fields.push({})}
            color='yellow'
          >
            <Button.Content visible>ADD NEW TASK</Button.Content>
            <Button.Content hidden>
              <Icon name='plus' />
            </Button.Content>
          </Button>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((task, index) => (
          <li key={index}>
            <Button
              icon
              onClick={() => fields.remove(index)}
              floated='right'
              color='red'
            >
              <Icon name='remove' />
            </Button>
            <Header size='large'>TASK #{index + 1}</Header>
            <Field
              name={`${task}.input`}
              type='text'
              component={renderInput}
              label='input'
            />
            <Field
              name={`${task}.output`}
              type='text'
              component={renderInput}
              label='output'
            />
          </li>
        ))}
      </ul>
    </Segment>
  )
  return (
    <>
    <HeaderNav
        absolute
        color='rose'
        brand='ThCoding'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
    <div className='ui container' style={{ marginTop: '10%' }}>
      <form className='ui form error huge' onSubmit={handleSubmit(submit)}>
        <div className='field'>
          <label>Header</label>
          <Field name='Header' component={renderInput} />
        </div>
        <div className='field'>
          <label>Sub Headers</label>
          <Field name='Sub' component={renderInput} />
        </div>
        <div className='field'>
          <label>Description</label>
          <Field name='description' component={renderTextArea} />
        </div>
        <div className='field'>
          <label>Theme</label>
          <Field name='theme' component='select'>
            <option />
            <option value='Football'>Football</option>
            <option value='Space'>Space</option>
            <option value='Wonder'>Wonder</option>
          </Field>
        </div>
        <div className='field'>
          <label>Language</label>
          <Dropdown
            placeholder={lang}
            search
            selection
            options={stateOptions}
            onChange={onselectlang}
          />
        </div>
        <div className='field'>
          <MonacoEditor
            width='100%'
            height='400px'
            language={lang.toLowerCase()}
            theme='vs-dark'
            value={valueSelect()}
            options={options}
            onChange={onChange}
          />
        </div>
        <FieldArray name='task' component={renderTask} />
        <button className='ui button' type='submit' disabled={submitting}>
          Submit
        </button>
      </form>
    </div>
    </>
  )
}

let ContactForm = reduxForm({
  // a unique name for the form
  form: 'Problem',
  validate
})(Create)
export default ContactForm
