import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [registerusername, setRegisterusername] = useState('')
  const [registerpassword, setRegisterpassword] = useState('')
  const [loginusername, setloginusername] = useState('')
  const [loginpassword, setloginpassword] = useState('')
  const [data, setData] = useState(null)

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerusername,
        password: registerpassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/register'
    }).then((res) => console.log(res))
  };

  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: loginusername,
        password: loginpassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/login'
    }).then((res) => console.log(res))
  };

  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user'
    }).then((res) => {
      setData(res.data)
      console.log(res.data)
    }
    )
  };

  const logout = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then((res) => console.log(res))
  }

  return (<>
    <div className='App'>
      <div>
        <h1>Register</h1>
        <input placeholder='username' onChange={e => setRegisterusername(e.target.value)}></input>
        <input placeholder='password' onChange={e => setRegisterpassword(e.target.value)}></input>
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input placeholder='username' value={loginusername} onChange={e => setloginusername(e.target.value)}></input>
        <input placeholder='password' value={loginpassword} onChange={e => setloginpassword(e.target.value)}></input>
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome back {data.username}!, id:{data._id}</h1> : null}
      </div>

      <div>
        <h1>Logout!</h1>
        <button onClick={logout}>Submit</button>
      </div>
    </div>
  </>);
}

export default App;
