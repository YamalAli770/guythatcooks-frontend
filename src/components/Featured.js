import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const Popular = () => {
  const { blogs } = useContext(BlogContext);
  let blogArray;
  if(blogs) {
    blogArray = blogs.slice(1, 4);
  }
  return (
    <>
      {blogArray && <main className="featured-blogs">
          <div className="featured-blogs-left">
            <h1 className="featured-blogs-left-header">
              Featured Blogs
            </h1>
            <Link to={`/blog/${blogs[0]._id}`}>
                <div className="featured-blogs-left-image">
                  <img src={`/images/${blogs[0].img}`} alt="" />
                </div>
                <span className="featured-blogs-left-date">
                  {new Date(blogs[0].createdAt).toDateString()}
                </span>
                <h2 className="featured-blogs-left-title">
                  {blogs[0].title}
                </h2>
              </Link>
              <p className="featured-blogs-left-desc">
                {blogs[0].desc}
              </p>
          </div>
          <div className="featured-blogs-right">
            { blogArray.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog._id}`}>
                <section>
                  <div className="featured-blogs-right-image">
                    <img src={`/images/${blog.img}`} alt={blog.title} />
                  </div>
                  <div className="featured-blogs-right-text">
                    <span className="featured-blogs-right-date">
                    {new Date(blog.createdAt).toDateString()}
                    </span>
                    <h3 className="featured-blogs-right-title">
                    {blog.title}
                    </h3>
                  </div>
                </section>
              </Link>
            )) }
          </div>
      </main>}
    </>
  )
}

export default Popular