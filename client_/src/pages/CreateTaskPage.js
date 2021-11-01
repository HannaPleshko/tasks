import React, {useContext, useState, useRef } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  return [htmlElRef, setFocus]
}

export const CreateTaskPage = () => {
  const { token } = useContext(AuthContext)
  const [tasks, setTask] = useState('')
  const [task_desc, setTaskDesc] = useState('')
  // const [all_tasks, setAllTasks] = useState('')
  const [inputRef, setInputFocus] = useFocus()
  const { request } = useHttp()

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        console.log(tasks);
        await request('/tasks', 'POST',
          {
            title: tasks, description: task_desc
          }, {
          authorization: `Bearer ${token}`
        })
        // console.log('data', data);
        // setAllTasks(data)
        // history.push(`/detail/${data.link._id}`)
        setTask('')
        setTaskDesc('')
      } catch (e) { }
    }
  }

  // const getAllTasks = useCallback(async () => {
  //   try {
  //     const fetched = await request('/tasks', 'GET', null, { authorization: `Bearer ${token}` })
  //     setAllTasks(fetched)
  //   } catch (e) { }
  // }, [token, request])

  // useEffect(() => {
  //   getAllTasks()
  // }, [getAllTasks])

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <div className="container">
    <div className="input-field">
      <h1>Сreate a new task </h1>
      <div className="input-field">
        <input
          id="task_name"
          type="text"
          name="task_name"
          value={tasks}
          onChange={e => setTask(e.target.value)}
          onKeyPress={setInputFocus}
        />
        <label htmlFor="task_name">task name</label>
      </div>
      <div className="input-field">
        <input
          id="task_desc"
          type="text"
          name="task_desc"
          value={task_desc}
          onChange={e => setTaskDesc(e.target.value)}
          ref={inputRef}
          onKeyPress={pressHandler}
        />
        <label htmlFor="task_desc">task description</label>
      </div>
    </div>
  </div>
  )
}