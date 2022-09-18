import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { FaAt, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/Context'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import showPassword from '../helper/showPassword'

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START'});
    try {
        const res = await axios.post('/auth/login', {
            email,
            password
        })
        if(res.data) {
            setEmail('');
            setPassword('');
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            navigate('/');
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE' });
        toast.error(error.response.data.message, {
            position: "top-right",
            draggable: false,
            pauseOnHover: false,
            autoClose: 2000
        })
    }
  }
  return (
    <main className="login">
        <h3 className='login-header'>Welcome Back</h3>
        <form className='login-form'>
            <section className="login-form-section">
                <label htmlFor="email">Email</label>
                <div className="login-input-container">
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FaAt className='at-icon' />
                </div>
            </section>
            <section className="login-form-section">
                <label htmlFor="password">Password</label>
                <div className="login-input-container">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FaEye className='eye-icon' onClick={(e) => showPassword(e)} />
                </div>
            </section>
            <ToastContainer />
            <p className="not-registered">Don't have an account yet? Please <Link to='/register'>Register</Link> </p>
            <button type='submit' className="login-btn" onClick={(e) => handleLogin(e)}>Sign in</button>
        </form>
    </main>
  )
}

export default Login