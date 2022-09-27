import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const JapaneseBlog = ({ blog }) => {
  return (
    <main className="japanese-blog">
        <div className="japanese-blog-image">
            <LazyLoadImage src={`/images/${blog.img}`} alt={blog.title} />
        </div>
        <span className="japanese-blog-date">{new Date(blog.createdAt).toDateString()}</span>
        <h2 className="japanese-blog-title">
            {blog.title}
        </h2>
        <p className="japanese-blog-desc">{blog.desc}</p>
    </main>
  )
}

export default JapaneseBlog