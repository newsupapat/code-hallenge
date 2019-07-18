import React from 'react'
import MonacoEditor from 'react-monaco-editor'
const code = `

// Define Typescript Interface Employee
interface Employee {
    firstName: String;
    lastName: String;
    contractor?: Boolean;
}

// Use Typescript Interface Employee. 
// This should show you an error on john 
// as required attribute lastName is missing
const john:Employee = {
    firstName:"John",
    // lastName:"Smith"
    // contractor:true
}

`
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code
    }
  }
  editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor)
    editor.focus()
  }
  onChange = (newValue, e) => {
    console.log('onChange', newValue, e)
  }
  render () {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true
    }
    return (
      <MonacoEditor
        width='800'
        height='600'
        language='javascript'
        theme='vs-dark'
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    )
  }
}
export default Editor
