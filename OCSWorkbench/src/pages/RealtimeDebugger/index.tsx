import * as React from 'react';
import {Component} from "react";
import {Button, Dropdown, Menu} from "@alifd/next";
import CodeEditor from "@/pages/RealtimeDebugger/components/CodeEditor";
import {loadScripts} from "@/pages/RealtimeDebugger/components/Storage";
import {Axios} from "axios";
import Weiwo from "@/weiwo/weiwo";

class RealtimeDebugger extends Component<{}, {
  scripts: NameSourcePair[],
  instructionCode: string | null,
}> {

  codeEditor: CodeEditor;

  constructor(props) {
    super(props)
    this.codeEditor = new CodeEditor({});
    this.state = {
      scripts: loadScripts(),
      instructionCode: null
    }
  }

  render() {
    const { scripts, instructionCode } = this.state;

    return (
      <div className='object-inspector-page'>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            const currentCodeEditor = this.codeEditor;
            if (currentCodeEditor) {
              currentCodeEditor.editScriptName()
            }
          }}
        >
          保存当前脚本
        </Button>

        {/*// TODO:*/}
        {/*{scripts.length > 0 ? (*/}
        {/*  <ScriptButtonGroup*/}
        {/*    onScriptExecute={(index) => {*/}
        {/*      const script = scripts[index]*/}
        {/*      const currentCodeEditor = this.codeEditor.current*/}
        {/*      if (currentCodeEditor) {*/}
        {/*        currentCodeEditor.applyCode(script.source)*/}
        {/*      }*/}
        {/*    }}*/}
        {/*  />*/}
        {/*) : null}*/}

        <Dropdown trigger={<Button style={{ marginLeft: 10 }}> 补丁管理 </Button>}>
          <Menu>
            <Menu.Item
              onClick={async () => {
                type GetPatchSource = {
                  data: string
                }
                const { data }: GetPatchSource = await Axios.get(`http://${Weiwo.GatewayHost}:9010/patch/source`)
                const currentCodeEditor = this.codeEditor.current
                if (currentCodeEditor) {
                  currentCodeEditor.applyCode(data)
                }
              }}
            >
              编辑补丁
            </Menu.Item>
            <Menu.Item
              onClick={async () => {
                const currentCodeEditor = this.codeEditor.current
                if (currentCodeEditor) {
                  await currentCodeEditor.writePatch()
                }
              }}
            >
              上传补丁
            </Menu.Item>
          </Menu>
        </Dropdown>

        <Button style={{ marginLeft: 10 }} onClick={() => this.exportJSON()}>
          导出 JSON
        </Button>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          <CodeEditor
            ref={this.codeEditor}
            onScriptsSaved={(scripts) => {
              this.setState({ scripts })
            }}
            onViewInstructionClicked={async (code) => {
              await setStateAsync(this, { instructionCode: '' })
              await setStateAsync(this, { instructionCode: code })
            }}
          />

          {/*// TODO:*/}
          {/*{instructionCode ? (*/}
          {/*  <InstructionArea*/}
          {/*    code={instructionCode}*/}
          {/*    onClose={() => this.setState({ instructionCode: null })}*/}
          {/*    onError={(errorMsg: string) => {*/}
          {/*      const currentCodeEditor = this.codeEditor.current*/}
          {/*      if (currentCodeEditor) {*/}
          {/*        currentCodeEditor.showError(errorMsg)*/}
          {/*      }*/}
          {/*    }}*/}
          {/*  />*/}
          {/*) : null}*/}

          {/*// TODO*/}
          {/*<WeiwoGlobals />*/}
        </div>
      </div>
    );
  }
}

export default RealtimeDebugger;
