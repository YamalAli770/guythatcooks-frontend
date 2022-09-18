import React from 'react'

const PakistaniBlog = ({ blog }) => {
  return (
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
  )
}

export default PakistaniBlog