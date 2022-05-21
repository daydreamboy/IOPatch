import {Component} from "react";
import OCSParser from '../../../../parsers/ocs-parser';
import sleep from "sleep-promise";
import {Axios} from "axios";
import Weiwo from "@/weiwo/weiwo";
import Toastify from 'toastify-js';
import { Delete, Correct, Picture, Add, Play, Refresh, Success, Error, Close } from '@icon-park/react';
import React from "react";
import Loading from '../Loading';

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
}>{
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

  applyCode(code: string) {
    this.setState({ code })
  }

  editorScriptName() {
    this.setState({ editing: true })
  }

  showError(errorMsg: string) {
    this.setState({ errorMsg });
  }

  compile(): Promise<CodeEditorCompileResult> {
    return new Promise(async (resolve, reject) => {
      const code = this.state.code.trim();
      this.setState({ errorMsg: null, icon: 'loading' });
      try {
        localStorage.setItem(storageKeySource, code);
        const ast = OCSParser.parse(code);
        resolve({ ast, code })
        this.setState({ codeChanged: false, icon: 'success-filling' });
        // TODO: why?
        await sleep(500);
        this.setState({ icon: 'play' });
      }
      catch (e) {
        this.setState({ errorMsg: e.message, icon: 'error' });
        reject(e.message);
      }
    });
  }

  async writePatch() {
    const { code, ast } = await this.compile();

    const { data }: PatchWriteResult = await Axios.post(`http://${Weiwo.GatewayHost}:9010/patch/write`, {
      source: code,
      remotelib: JSON.stringify(ast)
    });

    const { ok, errorMsg } = data;
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
        onClick: function () {} // Callback after click
      }).showToast()
    } else {
      if (errorMsg) {
        this.setState({ errorMsg, icon: 'error' })
      }
    }
  }

  async executeCode() {
    try {
      const { ast } = await this.compile();
      await doCode(ast);
    } catch (e) {
      this.showError(e.message);
    }
  }

  executeStatusIcon() {
    const { icon } = this.state
    switch (icon) {
      case 'play':
        return <Play />
      case 'success-filling':
        return <Success theme='filled' />
      case 'error':
        return <Error />
      case 'loading':
        return <Loading />
    }
  }
}
