import './workflow.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Flow from '../../components/Flow/Flow'

const WorkFlow = () => {
  const [userData, setUserData] = useState()
  const [moduleData, setModuleData] = useState()

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${id}`
        )
        setUserData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchModule = async () => {
      try {
        const res = await axios.get(
          `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5`
        )
        setModuleData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    fetchModule()
  }, [])

  const onDragStart = (event, nodeType, from, to, name) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType)
    event.dataTransfer.setData('application/reactflow/from', from)
    event.dataTransfer.setData('application/reactflow/to', to)
    event.dataTransfer.setData('application/reactflow/name', name)

    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className='workFlow'>
      <h1>flow</h1>
      <div className='wrapper'>
        <div className='header'>
          <span>Workflow name : {userData?.name}</span>
        </div>
        <div className='body'>
          <div className='left'>
            <div className='leftTop'>Modules</div>
            <div className='leftBottom'>
              {moduleData?.map((item, index) => (
                <div
                  className='module'
                  key={item.id}
                  onDragStart={(event) =>
                    onDragStart(
                      event,
                      'output',
                      item.input_type,
                      item.output_type,
                      item.name
                    )
                  }
                  draggable
                >
                  <div
                    className='moduleLeft'
                    style={{ textTransform: 'uppercase' }}
                  >
                    {item.input_type}
                  </div>
                  <div className='moduleCentre'>{item.name}</div>
                  <div
                    className='moduleRight'
                    style={{ textTransform: 'uppercase' }}
                  >
                    {item.output_type}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='right'>
            <Flow />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkFlow
