import {ObjectBriefProps} from "@/pages/RealtimeDebugger/components/GlobalArea/ObjectBrief/types";
import {InspectRawValue} from "@/pages/RealtimeDebugger/components/GlobalArea/types";

export const ObjectBrief = ({ content, onChange, onPush, title }: ObjectBriefProps) => {
  const { type } = content

  switch (type) {
    // non link
    case 'raw': {
      const rawValue = content as InspectRawValue;
      return (
        <small>
          <JSValueComponent value={rawValue.value} onChange={onChange} />
        </small>
      )
    }
    case 'pointer': {
      const rawValue = content as InspectRawValue
      const pointer = rawValue.value as string
      return <code className='number-value'> {pointer} </code>
    }
    case 'url': {
      const rawValue = content as InspectRawValue
      const url = rawValue.value as string
      return <a href={url}>{url}</a>
    }
    case 'date': {
      const rawValue = content as InspectRawValue
      const timestamp = rawValue.value as number
      const date = new Date(timestamp * 1000)
      return (
        <span>
          <b>Date</b>: {dateformat(date, 'yyyy-m-d HH:MM:ss.l')}
        </span>
      )
    }
    case 'struct': {
      const { string, name } = content as InspectStruct
      if (string) {
        return (
          <small>
            <b>{name}</b>: {string}
          </small>
        )
      }
      return <small> 结构体:{name} </small>
    }
    case 'wrong': {
      const { msg } = content as InspectWrong
      return <small> 错误: {msg} </small>
    }

    // link to other
    case 'object': {
      const obj = content as InspectObject
      if (onPush) {
        if (title) {
          return <ObjectLink title={title} content={obj} onPush={onPush} />
        }
      } else {
        const balloon = <ObjectBalloon content={obj} />
        if (onChange && 'count' in content) {
          return (
            <div>
              {balloon}
              <JSONEditorBalloon
                address={obj.address}
                valueLoader={async () => await jsonFromAddress(obj.address)}
                onChange={onChange}
              />
            </div>
          )
        } else {
          return balloon
        }
      }
    }
    case 'block': {
      const block = content as InspectBlock
      const label = <small> {block.class} </small>
      const triggerContent = <ObjectCallTable spec={block.address} types={block.types} />
      return <InspectorBalloon triggerLabel={label} triggerContent={triggerContent} />
    }
    case 'class': {
      const { name } = content as InspectClass
      return <ClassBalloon name={name} />
    }

    default:
      return <small> 未知类型 {type} </small>
  }
}
