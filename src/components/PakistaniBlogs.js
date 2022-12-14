import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import PakistaniBlog from './PakistaniBlog'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import { useEffect } from 'react'

const PakistaniBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    if(blogs) {
      const result = blogs.filter((blog) => blog.category === 'Pakistani');
      setFilteredBlogs(result);
    }
  }, [blogs])
  return (
    <main className="pakistani-blogs">
        <div className="pakistani-blogs-header">
          <h3>Pakistani</h3>
          <Link className='view-all' to="/blogs/pakistani">
          <p>View All</p>
          <FaArrowRight />
        </Link>
        </div>
        <div className="pakistani-blogs-container">
          { filteredBlogs.map((blog) => (<Link key={blog._id} to={`/blog/${blog._id}`}><PakistaniBlog  blog={blog} /></Link>))}
        </div>
    </main>
  )
}

export default PakistaniBlogs