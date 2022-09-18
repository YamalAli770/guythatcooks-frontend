import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import IndianBlog from './IndianBlog'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import { useEffect } from 'react'

const IndianBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    if(blogs) {
      const result = blogs.filter((blog) => blog.category === 'Indian');
      setFilteredBlogs(result);
    }
  }, [blogs])
  return (
    <main className="indian-blogs">
        <h3 className="indian-blogs-header">Indian</h3>
        <div className="indian-blogs-container">
          { filteredBlogs.map((blog) => (<Link key={blog._id} to={`/blog/${blog._id}`}><IndianBlog key={blog._id} blog={blog} /></Link>))}
        </div>
        <Link className='view-all' to="/blogs/indian">
          <p>View All</p>
          <FaArrowRight />
        </Link>
    </main>
  )
}

export default IndianBlogs