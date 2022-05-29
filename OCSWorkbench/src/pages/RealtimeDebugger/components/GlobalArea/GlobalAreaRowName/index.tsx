import React, { Component } from 'react';
import { Balloon, Input } from '@alifd/next';
import { setStateAsync } from '@/weiwo/utils';
import { renameGlobal } from '@/services/ocs-workbench';
import ObjectiveCCodeEditor from "@/pages/RealtimeDebugger/components/ObjectiveCCodeEditor";

class GlobalAreaRowName extends Component<{ name: string }, { name: string; editing: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.name,
    };
  }

  render() {
    const { name, editing } = this.state;
    return (
      <Balloon
        visible={editing}
        trigger={
          <span
            onDoubleClick={() => {
              this.setState({ editing: true });
            }}
          >
            {this.props.name}
          </span>
        }
        onClose={() => {
          this.setState({ editing: false });
        }}
      >
        <Input
          value={name}
          onChange={(value: string, e: Event) => {
            return setStateAsync(this, { value });
          }}
          onPressEnter={async () => {
            await renameGlobal(this.props.name, name);
            await setStateAsync(this, { editing: false });
          }}
        />
      </Balloon>
    );
  }
}

export default GlobalAreaRowName;
