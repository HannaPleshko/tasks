import React, { useContext, useState, useCallback, useEffect } from 'react'
import TodoList from './TodoList'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'

export const TaksPage = () => {
  const { token } = useContext(AuthContext)
  const [all_tasks, setAllTasks] = useState('')
  const { request, loading } = useHttp()

  const getAllTasks = useCallback(async () => {
    try {
      const fetched = await request('/tasks', 'GET', null, { authorization: `Bearer ${token}` })
      setAllTasks(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    getAllTasks()
  }, [getAllTasks])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container">
      <h1>All tasks</h1>
      { (!loading && all_tasks && <TodoList todos={all_tasks} />) || <Link to={'/createtask'}><h5>The list is empty! Do you want to create tasks?</h5> </Link>}
    </div>
  )
}