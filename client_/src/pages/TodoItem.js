import React, { useContext, useState, useCallback }  from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { createHashHistory } from "history";

export default function TodoItem({title, id, completed}) {
  const { token } = useContext(AuthContext)
  // const [del_task, setDelTask] = useState('')
  const { request } = useHttp()
  const history = createHashHistory();
  // const delTask = false

  const deleteItem = useCallback(async (task_id) => {
    try {
      const fetched = await request(`/tasks/${task_id}`, 'DELETE', null, { authorization: `Bearer ${token}` })
      history.go("/tasks");
      // delTask = true
      // setDelTask('')
    } catch (e) { }
  }, [token, request])

  return (
    <li className="todo">
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
        />
        <span id={id}>{title}</span>

        <i
          id={id}
          className="material-icons red-text"
          onClick={e => deleteItem(e.target.id)}
        >
          delete
        </i>
      </label>
    </li>
  )
}