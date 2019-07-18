import React from 'react'
import MonacoEditor from 'react-monaco-editor'
const code = `
#include <stdio.h>
int main()
{
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
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
    // console.log('onChange', newValue, e)
    this.setState({ code: newValue })
    this.props.onchange(newValue)
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
        language='c'
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
