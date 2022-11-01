import React from 'react'
import { useDrag } from 'react-dnd'
function DraggableDiv({type:name,class:classNameOF,notMovable,onPress}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'box',
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name],
  )
  return (
    <div ref={notMovable?null:drag} style={{opacity}} className={`dragbox ${classNameOF}`} onClick={onPress}>{name}</div>
  )
}

export default DraggableDiv