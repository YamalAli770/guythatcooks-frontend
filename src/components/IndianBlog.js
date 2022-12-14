import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const IndianBlog = ({ blog }) => {
  return (
    <main className="indian-blog">
        <div className="indian-blog-image">
            <LazyLoadImage src={`/images/${blog.img}`} alt={blog.title}  />
        </div>
        <span className="indian-blog-date">{new Date(blog.createdAt).toDateString()}</span>
        <h2 className="indian-blog-title">
            {blog.title}
        </h2>
        <p className="indian-blog-desc">{blog.desc}</p>
    </main>
  )
}

export default IndianBlog