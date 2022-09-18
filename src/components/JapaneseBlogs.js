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
        <h3 className="japanese-blogs-header">Japanese</h3>
        <div className="japanese-blogs-container">
          { filteredBlogs.map((blog) => (<Link key={blog._id} to={`/blog/${blog._id}`}><JapaneseBlog  blog={blog} /></Link>))}
        </div>
        <Link className='view-all' to="/blogs/japanese">
          <p>View All</p>
          <FaArrowRight />
        </Link>
    </main>
  )
}

export default JapaneseBlogs