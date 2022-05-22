import React from "react";
import {FunctionComponent} from "react";
import AceEditor from "react-ace";
import 'brace/mode/objectivec';
import 'brace/theme/xcode';

const ObjectiveCCodeEditor: FunctionComponent<ObjectiveCCodeEditorProps> = ({ value, onChange }) => (
  <AceEditor
    name="objectiveCCodeEditor"
    mode='objectivec'
    enableBasicAutocompletion={true}
    enableLiveAutocompletion={true}
    enableSnippets={true}
    style={{ width: '100%', fontFamily: 'Monospace' }}
    theme='xcode'
    value={value}
    wrapEnabled={true}
    onChange={onChange}
  />
)

export default ObjectiveCCodeEditor;
