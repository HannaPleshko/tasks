import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const LoginPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    login: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    console.log('loginHandler');
    try {
      const data = await request('/auth/login', 'POST', { ...form })
      auth.login(data.token)
    } catch (e) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Task Manager</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="login"
                  type="text"
                  name="login"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="login">Login</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="login">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign in
            </button>
            <Link to={'/auth/register'}>
              <button
                className="btn grey lighten-1 black-text"
                disabled={loading}
              >
                Registration
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RegisterPage = () => {
  const {loading, request} = useHttp()
  const [form, setForm] = useState({
    login: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/auth/register', 'POST', {...form}) 
      console.log(data);    
    } catch (e) {}
  }

  return (
    <div className="row">
    <div className="col s6 offset-s3">
      <h1>Task Manager</h1>
      <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Registration</span>
          <div>

            <div className="input-field">
              <input
                id="login"
                type="text"
                name="login"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="login">Login</label>
            </div>

            <div className="input-field">
              <input
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="login">Password</label>
            </div>

          </div>
        </div>
        <div className="card-action">
          <button
            className="btn yellow darken-4"
            style={{marginRight: 10}}
            onClick={registerHandler}
            disabled={loading}
          >
            Register now
          </button>
          <Link to={'/auth/login'}>
          <button
            className="btn grey lighten-1 black-text"
            disabled={loading}
          >
            Authorization
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}