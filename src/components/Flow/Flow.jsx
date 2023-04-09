import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow'

import 'reactflow/dist/style.css'
import CustomNode from '../CustomNode/CustomNode'

const initialNodes = [
  {
    id: 'A',
    type: 'customNode',
    position: { x: 0, y: 0 },
    data: { label: `input`, to: 'A', from: 'A' },
  },
  {
    id: 'A',
    type: 'customNode',
    position: { x: 0, y: 100 },
    data: { label: `output`, to: 'A', from: 'A' },
  },
  {
    id: 'B',
    type: 'customNode',
    position: { x: 200, y: 180 },
    data: { label: `output`, to: 'B', from: 'A' },
  },
  {
    id: 'C',
    type: 'customNode',
    position: { x: 10, y: 200 },
    data: { label: `output`, to: 'c', from: 'A' },
  },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

const proOptions = { hideAttribution: true }

export default function App() {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const nodeTypes = { customNode: CustomNode }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')
      const to = event.dataTransfer.getData('application/reactflow')
      const from = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode = {
        id: from,
        type: 'customNode',
        position,
        data: { label: `output`, from: from, to: to },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  const isValidConnection = (connection) => connection.target === 'B'
  const onConnectStart = (_, { nodeId, handleType }) =>
    console.log('on connect start', { nodeId, handleType })
  const onConnectEnd = (event) => console.log('on connect end', event)

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant='dots' gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}
