import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { FaAt, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import showPassword from '../helper/showPassword'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(false);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('https://guy-that-cooks-backend.onrender.com/api/auth/register', {
            username,
            email,
            password
        })
        if(res.data) {
            setUsername('');
            setEmail('');
            setPassword('');
            toast.success('User Registered Successfully', {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-right",
            draggable: false,
            pauseOnHover: false,
            autoClose: 2000
        })
    }
  };

  return (
    <main className="register">
        <h3 className='register-header'>Create Your Account</h3>
        <form className='register-form'>
            <section className="register-form-section">
                <label htmlFor="username">Username</label>
                <div className="register-input-container">
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className='user-icon' />
                </div>
            </section>
            <section className="register-form-section">
                <label htmlFor="email">Email</label>
                <div className="register-input-container">
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FaAt className='at-icon' />
                </div>
            </section>
            <section className="register-form-section">
                <label htmlFor="password">Password</label>
                <div className="register-input-container">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passVisible ? <FaEyeSlash onClick={(e) => showPassword(e, setPassVisible)} className='eye-icon' /> : <FaEye onClick={(e) => showPassword(e, setPassVisible)} className='eye-icon' />}
                </div>
            </section>
            <ToastContainer />
            <p className='already-exists'>Already an existing user? Please <Link to='/login'>Login</Link></p>
            <button type='submit' onClick={(e) => handleRegister(e)} className="register-btn">Sign in</button>
        </form>
    </main>
  )
}

export default Register