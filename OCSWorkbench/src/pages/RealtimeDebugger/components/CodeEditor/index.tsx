import {Component} from "react";
import OCSParser from '../../../../parsers/ocs-parser';
import sleep from "sleep-promise";
import {Axios} from "axios";
import Weiwo from "@/weiwo/weiwo";
import Toastify from 'toastify-js';
import { Play, Success, Error, Close } from '@icon-park/react';
import React from "react";
import Loading from '../Loading';
import {Card} from "react-bootstrap";
import ObjectiveCCodeEditor from '../ObjectiveCCodeEditor';
import {Input} from "@alifd/next";
import Feedback from "react-bootstrap/Feedback";
import {loadScripts, saveScripts} from "@/pages/RealtimeDebugger/components/Storage";

let storageKeySource: string = 'source';

const doCode = async (ast: AstItem[]) => {
  // TODO:
  const result = '';//await _doCode(ast)
  if (typeof result == 'string' && result.length > 0) {
    eval(result)
  }
}

class CodeEditor extends Component<
  {
    onScriptsSaved: (scripts: NameSourcePair[]) => void,
    onViewInstructionClicked: (code: string) => void,
  },
  {
    code: string,
    editing: boolean,
    errorMsg: null | string,
    codeChanged: boolean,
    icon: 'play' | 'loading' | 'success-filling' | 'error',
}> {
  scriptName: string

  constructor(props) {
    super(props);
    const source = localStorage.getItem(storageKeySource);
    const code: string = source == null ? '' : source;

    this.state = {
      code,
      codeChanged: false,
      icon: 'play',
      editing: false,
      errorMsg: null,
    }
  }


  render() {
    const {onScriptsSaved, onViewInstructionClicked} = this.props;
    const {code, errorMsg, codeChanged, editing} = this.state;

    return (
      <Card status='info' style={{ marginBottom: 10, marginRight: 10, minWidth: '60%' }}>
        <Card.Header style={{ display: 'flex' }}>
          <small>代码 {codeChanged ? <span> * </span> : null}</small>
          <a
            style={{ marginLeft: 20, marginRight: 10, cursor: 'pointer' }}
            onClick={async () => {
              await this.executeCode()
            }}
          >
            {this.executeStatusIcon()}
          </a>
          {editing ? (
            <span>
            <Input
              placeholder='名称'
              size='small'
              onChange={(scriptName: string) => {
                this.scriptName = scriptName
              }}
              onPressEnter={() => {
                const scripts = loadScripts();
                scripts.push({ name: this.scriptName, source: this.state.code })
                saveScripts(scripts)

                if (onScriptsSaved) {
                  onScriptsSaved(scripts)
                }

                this.setState({ editing: false })
              }}
            />
            <Close
              style={{ marginLeft: 5 }}
              theme='filled'
              onClick={() => {
                this.setState({ editing: false })
              }}
            />
          </span>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'row-reverse', flexGrow: 1 }}>
            <a
              style={{ marginRight: 10, cursor: 'pointer', alignSelf: 'flex-end' }}
              onClick={() => {
                if (onViewInstructionClicked) {
                  onViewInstructionClicked(this.state.code)
                }
              }}
            >
              <small>查看指令</small>
            </a>
          </div>
        </Card.Header>
        <Card.Body>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ObjectiveCCodeEditor
              value={code}
              onChange={(code) => {
                this.setState({ code, codeChanged: true, icon: 'play' })
              }}
            />
            {errorMsg ? (
              <Feedback type='error' style={{ marginTop: 10 }}>
                {errorMsg}
              </Feedback>
            ) : null}
          </div>
        </Card.Body>
      </Card>
    );
  }

  applyCode(code: string) {
    this.setState({code})
  }

  editorScriptName() {
    this.setState({editing: true})
  }

  showError(errorMsg: string) {
    this.setState({errorMsg});
  }

  compile(): Promise<CodeEditorCompileResult> {
    return new Promise(async (resolve, reject) => {
      const code = this.state.code.trim();
      this.setState({errorMsg: null, icon: 'loading'});
      try {
        localStorage.setItem(storageKeySource, code);
        const ast = OCSParser.parse(code);
        resolve({ast, code})
        this.setState({codeChanged: false, icon: 'success-filling'});
        // TODO: why?
        await sleep(500);
        this.setState({icon: 'play'});
      } catch (e) {
        this.setState({errorMsg: e.message, icon: 'error'});
        reject(e.message);
      }
    });
  }

  async writePatch() {
    const {code, ast} = await this.compile();

    const {data}: PatchWriteResult = await Axios.post(`http://${Weiwo.GatewayHost}:9010/patch/write`, {
      source: code,
      remotelib: JSON.stringify(ast)
    });

    const {ok, errorMsg} = data;
    if (ok) {
      Toastify({
        text: '上传补丁成功',
        duration: 2000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        gravity: 'top', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {
        } // Callback after click
      }).showToast()
    } else {
      if (errorMsg) {
        this.setState({errorMsg, icon: 'error'})
      }
    }
  }

  async executeCode() {
    try {
      const {ast} = await this.compile();
      await doCode(ast);
    } catch (e) {
      this.showError(e.message);
    }
  }

  executeStatusIcon() {
    const {icon} = this.state
    switch (icon) {
      case 'play':
        return <Play/>
      case 'success-filling':
        return <Success theme='filled'/>
      case 'error':
        return <Error/>
      case 'loading':
        return <Loading/>
    }
  }
}

export default CodeEditor;
