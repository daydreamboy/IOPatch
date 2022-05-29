import { Component } from 'react';
import { GlobalAreaRowItem } from '@/pages/RealtimeDebugger/components/GlobalArea/types';
import {Delete} from "@icon-park/react";
import GlobalAreaRowName from "@/pages/RealtimeDebugger/components/GlobalArea/GlobalAreaRowName";

class GlobalAreaRow extends Component<
{
  item: GlobalAreaRowItem;
  deleteFunc: () => void;
}, {
  mouseOver: boolean;
}> {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  };

  render() {
    const { item } = this.props;
    return (
      <tr
        onMouseOver={() => {
          this.setState({ mouseOver: true })
        }}
        onMouseOut={() => {
          this.setState({ mouseOver: false })
        }}
      >
        <td>
          <span
            style={{ marginRight: 4, visibility: this.state.mouseOver ? 'visible' : 'hidden', color: 'red' }}
            onClick={this.props.deleteFunc}
          >
            <Delete />
          </span>
        </td>
        <td className='ivar-name'>
          <GlobalAreaRowName name={item.key} />
        </td>
        <td className='ivar-value'>
          <ObjectBrief content={item.value} />
        </td>
      </tr>
    )
  }
}
