import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ThaiBlog = ({ blog }) => {
  return (
    <main className="thai-blog">
        <div className="thai-blog-image">
            <LazyLoadImage src={`/images/${blog.img}`} alt={blog.title} />
        </div>
        <span className="thai-blog-date">{new Date(blog.createdAt).toDateString()}</span>
        <h2 className="thai-blog-title">
            {blog.title}
        </h2>
        <p className="thai-blog-desc">{blog.desc}</p>
    </main>
  )
}

export default ThaiBlog