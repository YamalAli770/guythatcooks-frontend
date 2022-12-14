import React, { useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import JapaneseBlog from './JapaneseBlog'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useState } from 'react'
import { BlogContext } from '../context/BlogContext'

const JapaneseBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    if(blogs) {
      const result = blogs.filter((blog) => blog.category === 'Japanese');
      setFilteredBlogs(result);
    }
  }, [blogs])
  return (
    <main className="japanese-blogs">
        <div className="japanese-blogs-header">
          <h3>Japanese</h3>
          <Link className='view-all' to="/blogs/japanese">
            <p>View All</p>
            <FaArrowRight />
          </Link>
        </div>
        <div className="japanese-blogs-container">
          { filteredBlogs.map((blog) => (<Link key={blog._id} to={`/blog/${blog._id}`}><JapaneseBlog  blog={blog} /></Link>))}
        </div>
    </main>
  )
}

export default JapaneseBlogs