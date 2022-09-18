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
        <h3 className="thai-blogs-header">Thai</h3>
        <div className="thai-blogs-container">
          { filteredBlogs.map((blog) => (<Link key={blog._id} to={`/blog/${blog._id}`}><ThaiBlog blog={blog} /></Link>))}
        </div>
        <Link className='view-all' to="/blogs/thai">
          <p>View All</p>
          <FaArrowRight />
        </Link>
    </main>
  )
}

export default ThaiBlogs