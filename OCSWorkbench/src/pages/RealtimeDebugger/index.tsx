import * as React from 'react';
import {Component} from "react";

class RealtimeDebugger extends Component<{}, {
  scripts: NameSourcePair[],
  instructionCode: string | null,
}> {
  render() {
    return (
      <div>
        这时调试页面2222
      </div>
    );
  }
}

export default RealtimeDebugger;
