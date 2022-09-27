import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext';
import {UserContext}  from '../context/UserContext'
import { Link } from 'react-router-dom';
import { FaRegSadCry } from 'react-icons/fa';

const Profile = () => {
  const { user } = useContext(UserContext);
  const { blogs } = useContext(BlogContext);

  let favouriteBlogsIds;

  if(user) {
    favouriteBlogsIds = user.favourites;
  }

  const filteredBlogs = [];

  if(user && favouriteBlogsIds.length > 0 && blogs) {
    for (let i = 0; i < blogs.length; i++) {
      for (let j = 0; j < favouriteBlogsIds.length; j++) {
        if(blogs[i]._id === favouriteBlogsIds[j]) {
          filteredBlogs.push(blogs[i]);
          break;
        }
      }
      if(favouriteBlogsIds.length === filteredBlogs.length) {
        break;
      }
    }
  }

  return (
    <>
      { user && <main className="profile">
        <h1 className="profile-header">User Details</h1>
        <div className="profile-details-container">
          <div className="detail-container">
            <img src="/images/person.jpg" alt="" />
          </div>
          <div className="detail-container">
            <label>User Name:</label>
            <p>{user.username}</p>
          </div>
          <div className="detail-container">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="favourite-blogs">
          <h1>Favourite Blogs</h1>
          <div className="favourite-blogs-container">
            { filteredBlogs.length <= 0 && 
                <div className='no-favourites'>
                  <FaRegSadCry />
                  <p>No Favourites Added</p>
                </div>
            }
            { filteredBlogs.map((blog) => (
              <Link to={`/blog/${blog._id}`} key={blog._id}>
                <main className="pakistani-blog">
                  <div className="pakistani-blog-image">
                      <img src={`/images/${blog.img}`} alt={blog.title} />
                  </div>
                  <span className="pakistani-blog-date">{new Date(blog.createdAt).toDateString()}</span>
                  <h2 className="pakistani-blog-title">
                      {blog.title}
                  </h2>
                  <p className="pakistani-blog-desc">{blog.desc}</p>
                </main>
              </Link>
            ) ) }
          </div>
        </div>
      </main>}
    </>
  )
}

export default Profile