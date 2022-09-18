import React, { useContext } from 'react'
import { UserContext } from '../context/Context'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios');

const Navbar = () => {
  const { user, dispatch } = useContext(UserContext);
  const handleLogout = async () => {
    try {
        const res = await axios.get('/auth/logout');
        if(res.status === 204) {
            dispatch({ type: 'LOGOUT_USER' });
            console.log(res);
            localStorage.clear();
            toast.success('User Successfully Logged Out', {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            });
        }
    } catch (error) {
        toast.error('Cannot Logout User', {
            position: "top-right",
            draggable: false,
            pauseOnHover: false,
            autoClose: 2000
        });
    }
    
  }
  return (
    <>
        <main className="navbar-container">
            <div className="navbar-left">
                <Link to="/">
                    <h1 className='navbar-left-header'>Blog..</h1>
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
                    {user ? <p>{user.username}</p> : 
                        <Link to='/register'>
                            <p>Register</p>
                            <FaUser />
                        </Link>
                    }
                </nav>
            </div>
        </main>    
        <ToastContainer />
    </>
  )
}

export default Navbar