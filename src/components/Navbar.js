import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { FaBars, FaUser } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios');

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(UserContext);
  const handleLogout = async () => {
    try {
        const res = await axios.get('https://guythatcooks-backend-production.up.railway.app/api/auth/logout');
        if(res.status === 204) {
            dispatch({ type: 'LOGOUT_USER' });
            localStorage.clear();
            navigate('/');
            toast.success('User Successfully Logged Out', {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            });
            handleToggle();
        }
    } catch (error) {
        handleToggle();
        toast.error('Cannot Logout User', {
            position: "top-right",
            draggable: false,
            pauseOnHover: false,
            autoClose: 2000
        });
    }
    
  }

  const handleToggle = () => {
    setOpen(false);      
  }
  
  return (
    <>
        <main className="navbar-container">
            <div className="navbar-left">
                <Link to="/" className='nav-logo'>
                    <span className='logo-top'>guy</span>
                    <span className='logo-bottom'>that cooks</span>
                </Link>
            </div>
            <div className="navbar-center">
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact Us</Link>
                    {user && (user.isAdmin && <Link to='/create'>Create</Link>)}
                    {user && <button onClick={handleLogout} className='navbar-center-logout'>Logout</button>}
                </nav>
            </div>
            <div className="navbar-right">
                <nav>
                    {user ? <Link to="/me">{user.username}</Link> : 
                        <Link to='/register'>
                            <p>Register</p>
                            <FaUser />
                        </Link>
                    }
                </nav>
            </div>
            { open ? <GrClose className='close-hamburger' onClick={(e) => setOpen(false)} /> : <FaBars className='open-hamburger' onClick={(e) => setOpen(true)} />}
            <div className={`hamburger-container ${open ? 'show-hamburger' : 'hide-hamburger'}`}>
                <nav className="hamburger-nav">
                    <Link onClick={handleToggle} to="/">Home</Link>
                    <Link onClick={handleToggle} to="/about">About</Link>
                    { user?.isAdmin && <Link onClick={handleToggle} to="/create">Create</Link>}
                    <Link onClick={handleToggle} to="/contact">Contact Us</Link>
                    { !user && <Link onClick={handleToggle} to="/register" className='hamburger-nav-register'>Register</Link>}
                    {user && <button onClick={handleLogout} className='navbar-center-logout hamburger-nav-logout'>Logout</button>}
                    { user && <Link onClick={handleToggle} to="/me" className='hamburger-nav-user'> <FaUser /> {user.username}</Link>}
                </nav>
            </div>
        </main>    
        <ToastContainer />
    </>
  )
}

export default Navbar