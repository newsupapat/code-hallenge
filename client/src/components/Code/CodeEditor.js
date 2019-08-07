import React from "react";
import MonacoEditor from "react-monaco-editor";
import { UpdateCode } from "actions";
import { connect } from "react-redux";

class Editor extends React.Component {
  editorDidMount = (editor, monaco) => {
    editor.layout();
    console.log("editorDidMount", editor);
    editor.focus();
  };

  onChange = (newValue, e) => {
    // console.log("onChange", newValue, e);
    this.props.UpdateCode(newValue);
  };

  render() {
    const options = {
      fontSize: "14px",
      automaticLayout: true,
      mouseWheelScrollSensitivity: 0.5,
      minimap: {
        enabled: false,
      },
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      scrollbar: {
        // Subtle shadows to the left & top. Defaults to true.
        useShadows: false,
        vertical: "visible",
        horizontal: "visible",

        verticalScrollbarSize: 5,
        horizontalScrollbarSize: 3,
      },
    };
    return (
      <MonacoEditor
        width="100%"
        height="400px"
        language={this.props.lang.toLowerCase()}
        theme="vs-dark"
        value={this.props.codesave}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}
const mapStatetoprop = state => {
  return { codesave: state.code };
};
export default connect(
  mapStatetoprop,
  { UpdateCode }
)(Editor);
