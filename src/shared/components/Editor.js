import React from 'react';
import AceEditor from 'react-ace';
import '../config/editor';
import '../styles/Editor.less';


export default class Editor extends React.Component {
  render() {
    const config = {
      showPrintMargin: true,
      showGutter: true,
      editorProps: { $blockScrolling: 'Infinity' },
      highlightActiveLine: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      tabSize: 2,
      setOptions: {
        showLineNumbers: true,
        enableSnippets: true,
      },
      mode: 'python',
      theme: 'monokai',
      ...this.props,
    };
    return (
      <AceEditor {...config} style={{ width: '100%' }} />
    )
  }
}
