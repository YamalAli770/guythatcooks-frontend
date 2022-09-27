import React from 'react'
import { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const SearchedCategory = () => {
    let [searchParams] = useSearchParams();
    const cuisine = searchParams.get("cuisine").toLowerCase();
    const { blogs } = useContext(BlogContext);
    let capCuisine;
    if(cuisine) {
        capCuisine = (cuisine.replace(cuisine[0], cuisine[0].toUpperCase()));
    }
    let filteredBlogs;
    if(blogs) {
        filteredBlogs = blogs.filter((blog) => blog.category === capCuisine);
    }

    return (
        <main className="single-category-blogs">
            <div className="single-category-blogs-header">
                <h3>{cuisine}</h3>
                <Link to="/" className='go-back'>
                    <p>Go Back</p>
                    <FaArrowLeft />
                </Link>
            </div>
            { blogs && <div className="single-category-blogs-container searched-category">
                { filteredBlogs.length > 0 ? filteredBlogs.map((blog) => {
                    return (
                        <Link to={`/blog/${blog._id}`} key={blog._id} className="single-category-blog">
                            <div className="single-category-blog-image">
                                <LazyLoadImage src={`/images/${blog.img}`} alt={blog.title} />
                            </div>
                            <span className="single-category-blog-date">{new Date(blog.createdAt).toDateString()}</span>
                            <h2 className="single-category-blog-title">
                                {blog.title}
                            </h2>
                            <p className="single-category-blog-desc">{blog.desc}</p>
                        </Link>
                    )
                }) : 
                    <div className="no-category-found">
                        <p>Cannot find any blog with the provided search term</p>
                    </div> 
                }
            </div>}
        </main>
    )
}

export default SearchedCategory