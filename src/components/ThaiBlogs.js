import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext'
import ThaiBlog from './ThaiBlog'

const ThaiBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    if(blogs) {
      const result = blogs.filter((blog) => blog.category === 'Thai');
      setFilteredBlogs(result);
    }
  }, [blogs])
  return (
    <main className="thai-blogs">
        <div className="thai-blogs-header">
          <h3>Thai</h3>
          <Link className='view-all' to="/blogs/thai">
            <p>View All</p>
            <FaArrowRight />
          </Link>
        </div>
        <div className="thai-blogs-container">
          { filteredBlogs.map((blog) => (<Link key={blog._id} to={`/blog/${blog._id}`}><ThaiBlog blog={blog} /></Link>))}
        </div>
    </main>
  )
}

export default ThaiBlogs