import { Component } from 'react';
import { InspectDictionary } from '@/pages/RealtimeDebugger/components/Lobby/types';

class Lobby extends Component<{}, {
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
    const watched = await watchWeiwoGlobalChangedEvent()
    if (watched == null) {
      this.setState({ offline: true })
      return
    }

    const websocket = Weiwo.createLogSocket('weiwo_global_changed', false)

    websocket.onmessage = () => {
      this.refresh()
    }

    await this.refresh()
  }

}
