import { Component } from 'react';
import {InspectDictionary, GlobalAreaRowItem} from '@/pages/RealtimeDebugger/components/GlobalArea/types';
import {inspectWeiwoGlobals, watchWeiwoGlobalChangedEvent} from '@/services/ocs-workbench';
import Weiwo from '@/weiwo/weiwo';
import {Card} from "react-bootstrap";
import {Delete, Loading, Refresh} from "@icon-park/react";
import React from 'react';

class GlobalArea extends Component<{}, {
  result?: InspectDictionary;
  offline: boolean;
}> {
  constructor(props) {
    super(props);
    this.state = {
      offline: false,
    };
  }

  async componentDidMount() {
    const watched = await watchWeiwoGlobalChangedEvent();
    if (watched == null) {
      this.setState({ offline: true });
      return;
    }

    const websocket = Weiwo.createLogSocket('weiwo_global_changed', false);

    websocket.onmessage = () => {
      this.refresh();
    };

    await this.refresh();
  }

  render() {
    const { result, offline } = this.state;

    let globals: GlobalAreaRowItem[] | null = null;
    if (result) {
      globals = [];
      const dict = result.value;
      const keys = Object.keys(dict);
      keys.sort();

      for (const key of keys) {
        if (key.startsWith('.')) {
          continue;
        }

        globals.push({
          key,
          value: dict[key],
        });
      }
    }

    return (
      <Card status={offline ? 'default' : 'info'} style={{ width: 300, minHeight: 300 }}>
        <Card.Header>
          对象区
          <span style={{ marginLeft: 10 }}>
            <a onClick={() => this.refresh()}>
              <Refresh theme="filled" />
            </a>
            <a
              style={{ marginLeft: 5 }}
              onClick={() => {
                Weiwo.gc();
                this.refresh();
              }}
            >
              <Delete theme="filled" />
            </a>
          </span>
        </Card.Header>
        <Card.Body>
          {globals ? (
            <table>
              <tbody>
              {globals.map((item) => (
                <WeiwoGlobalRow
                  item={item}
                  key={item.key}
                  deleteFunc={async () => {
                    await removeGlobal(item.key)
                    await this.refresh()
                  }}
                />
              ))}
              </tbody>
            </table>
          ) : offline ? (
            '离线'
          ) : (
            <Loading />
          )}
        </Card.Body>
      </Card>
    );
  }

  async refresh() {
    this.setState({
      result: await inspectWeiwoGlobals(),
    });
  }
}
