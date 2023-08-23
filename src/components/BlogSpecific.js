import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { FaEdit, FaRegHeart, FaHeart, FaTrash } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { BlogContext } from '../context/BlogContext'
import { UserContext } from '../context/UserContext'

const BlogSpecific = () => {
  const [updateMode, setUpdateMode] = useState(false)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState(''); 
  const [markdown, setMarkdown] = useState('');
  let isFavourite;

  const { user, dispatch: dispatchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs, dispatch } = useContext(BlogContext);
  
  let blogText = {};
  let filteredBlog;
  if(blogs) {
    filteredBlog = blogs.filter((blog) => blog._id === id);
    if(filteredBlog) {
        blogText.__html = filteredBlog[0].sanitizedHtml;
    }
  }

  const handleEditClick = () => {
    setUpdateMode(!updateMode);
    setTitle(filteredBlog[0].title);
    setCategory(filteredBlog[0].category);
    setDesc(filteredBlog[0].desc);
    setMarkdown(filteredBlog[0].markdown);
  }

  const handleBlogDelete = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.delete(`https://guy-that-cooks-backend.onrender.com/blogs/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken
            }
        });
        if(res.data) {
            const updatedBlogs = blogs.filter((blog) => blog._id !== res.data._id);
            dispatch({ type: 'UPDATE_BLOGS', payload: updatedBlogs })
            navigate('/');
            toast.success("Blog Deleted Successfully", {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
        
    } catch (error) {
        if(error?.response?.data?.message) {
            toast.error(error.response.data.message, {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
        else {
            toast.error("Cannot Delete Blog Right Now, Please Try Again Later", {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
    }
  };

  const handleBlogUpdate = async (e) => {
    e.preventDefault();
    if(title.length === 0 || category.length === 0 || desc.length === 0 || markdown.length === 0) {
        toast.error("All Fields Must Be Filled", {
            position: "top-right",
            draggable: false,
            pauseOnHover: false,
            autoClose: 2000
        })
    } else {
        try {
            const res = await axios.put(`https://guy-that-cooks-backend.onrender.com/blogs/${id}`, {title, category, desc, markdown}, {
                headers: {
                    'Authorization': 'Bearer ' + user.accessToken
                }
            })
            if(res.data) {
                let index;
                for (let i = 0; i < blogs.length; i++) {
                    if(blogs[i]._id === id) {
                        index = i;
                        break;
                    }
                }
                const updatedBlogs = blogs;
                updatedBlogs[index] = res.data;
                dispatch({ type: 'UPDATE_BLOGS', payload: updatedBlogs });
                setUpdateMode(false);
                toast.success("Blog Updated Successfully", {
                    position: "top-right",
                    draggable: false,
                    pauseOnHover: false,
                    autoClose: 2000
                })
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
    }
  }

  if(user) {
    user.favourites.forEach((favBlog) => {
        if(favBlog === id) {
            isFavourite = true;      
        }
    })}

  const handleFavourite = async () => {
    try {
        const result = await axios.put(`https://guy-that-cooks-backend.onrender.com/api/user/favourite/${user._id}?blog=${id}`, null, {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        })
        if(result.data) {
            const updatedUser = { ...result.data, accessToken: user.accessToken }
            dispatchUser({ type: 'UPDATE_USER', payload: updatedUser });
            isFavourite = true;
            toast.info('Blog Added As Favourite', {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-right",
            draggable: false,
            pauseOnHover: false,
            autoClose: 2000
        })
    }
  }; 

  return (
    <>
        <form action="">
            {filteredBlog && <main className="blog-specific">
                <div className="blog-specific-top">
                    {!updateMode && <span className="blog-specific-date">{new Date(filteredBlog[0].createdAt).toDateString()}</span>}
                    {user && !user.isAdmin && !updateMode && ( isFavourite ? <FaHeart className='block make-favourite-blog' /> : <FaRegHeart className='make-favourite-blog' onClick={handleFavourite} />)}
                    {user ? ( user.isAdmin && !updateMode && <div className="blog-edit-delete-btn">
                        <button className="blog-edit" onClick={handleEditClick}>
                            <FaEdit />
                        </button>
                        <button className="blog-delete" onClick={(e) => handleBlogDelete(e)}>
                            <FaTrash />
                        </button>
                    </div>) : null}
                </div>
                <section className="blog-specific-header">
                    {updateMode ? 
                    (
                        <div className="blog-specific-input-container">
                            <label htmlFor="blog-title">Title</label>
                            <input className='blog-edit-title-input' id='blog-title' type="text" placeholder='Enter Your Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    ) : 
                        <h1 className="blog-specific-title">{filteredBlog[0].title}</h1>
                    }
                    {updateMode ? 
                        (
                            <div className="blog-specific-input-container">
                                <label htmlFor="blog-category">Category</label>
                                <input className='blog-edit-category-input' id='blog-category' type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                        ) :
                        <span className='blog-specific-category'>{filteredBlog[0].category}</span>
                    }
                </section>
                <div className="blog-specific-image">
                    <LazyLoadImage src={`/images/${filteredBlog[0].img}`} alt={filteredBlog[0].title} />
                </div>
                {updateMode && 
                    <div className="blog-specific-input-container">
                        <label className="blog-desc-label" htmlFor="blog-desc">Description</label>
                        <input className='blog-edit-desc-input' id='blog-desc' type="text" placeholder='Enter Your Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                }
                {updateMode ? 
                (
                    <div className="blog-specific-input-container">
                        <label htmlFor="blog-markdown">Markdown</label>
                        <textarea className='blog-edit-markdown-input' id='blog-markdown' type="text" placeholder='Enter Your Markdown' rows="15" value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
                    </div>
                ) : 
                <div className="blog-specific-markdown" dangerouslySetInnerHTML={blogText}></div>
                }
                {!updateMode && 
                    <div className="blog-author">Author: {filteredBlog[0].author}</div>
                }
                {updateMode && 
                    <div className="blog-update-btn-container">
                        <button type='submit' className="blog-update-btn" onClick={(e) => handleBlogUpdate(e)}>Update</button> 
                    </div>
                }
            </main>}
        </form>
        <ToastContainer />
    </>
  )
}

export default BlogSpecific