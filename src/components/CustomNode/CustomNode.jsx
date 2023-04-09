import './customNode.scss'
import React from 'react'
import { useCallback } from 'react'
import { Handle, Position } from 'reactflow'

const CustomNode = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  console.log(data)

  return (
    <div className='customNode'>
      <Handle
        type='target'
        position={Position.top}
        isConnectable={isConnectable}
      />
      <div className='node'>
        <div className='nodeLeft'>A</div>
        <div className='nodeCentre'>
          {data.label === 'input' ? (
            <input type='text' placeholder='input' />
          ) : (
            <span>Sample module </span>
          )}
        </div>
        <div className='nodeRight'>B</div>
      </div>

      <Handle
        type='source'
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  )
}

export default CustomNode
