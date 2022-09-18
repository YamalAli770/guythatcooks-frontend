import React from 'react'
import { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const SingleCategoryBlogs = () => {
    const { blogs } = useContext(BlogContext);
    const { category } = useParams();
    const capCategory = (category.replace(category[0], category[0].toUpperCase()));
    console.log(capCategory);
    let filteredBlogs;
    if(blogs) {
        filteredBlogs = blogs.filter((blog) => blog.category === capCategory);
    }

    return (
        <main className="single-category-blogs">
            <div className="single-category-blogs-header">
                <h3>{category}</h3>
                <Link to="/" className='go-back'>
                    <p>Go Back</p>
                    <FaArrowLeft />
                </Link>
            </div>
            { blogs && <div className="single-category-blogs-container">
                {filteredBlogs.map((blog) => {
                    return (
                        <div key={blog._id} className="single-category-blog">
                            <div className="single-category-blog-image">
                                <img src={`/images/${blog.img}`} alt={blog.title} />
                            </div>
                            <span className="single-category-blog-date">{new Date(blog.createdAt).toDateString()}</span>
                            <h2 className="single-category-blog-title">
                                {blog.title}
                            </h2>
                            <p className="single-category-blog-desc">{blog.desc}</p>
                        </div>
                    )
                })}
            </div>}
        </main>
    )
}

export default SingleCategoryBlogs