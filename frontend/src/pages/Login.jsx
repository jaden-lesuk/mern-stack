import React, { useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

function Login() {
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      // toast.error(message)
      console.log(message);
    }
    if (user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isLoading, isError, isSuccess, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value]
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(password[0], email[0]);

    const userData = {
      email: email[0], 
      password: password[0]
    }

    dispatch(login(userData))
  };

  const { email, password } = formData;

  if(isLoading) {
    return <Spinner/>
  }


  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email" 
              value={email} 
              placeholder="Enter email"
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              value={password} 
              placeholder="Enter password"
              onChange={onChange} 
            />
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login