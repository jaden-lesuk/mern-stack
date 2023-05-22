import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

function Register() {
  const [formData,setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const { username, email, password, password2 } = formData;

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
    // Form input returned as array istead of text???
    e.preventDefault();

    // wtf?
    console.log(password[0], password2[0], username[0], email[0]);

    if(password[0] !== password2[0]){
      // toast.error('passwords do not match')
      console.log('passwords do not match')
    } else {
      const userData = {
        username: username[0], 
        email: email[0], 
        password: password[0]
      }

      dispatch(register(userData))
    }

  };

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              name="username" 
              value={username} 
              placeholder="Enter username"
              onChange={onChange} 
            />
          </div>
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
            <input 
              type="password" 
              className="form-control" 
              id="password2" 
              name="password2" 
              value={password2} 
              placeholder="Confirm password"
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

export default Register