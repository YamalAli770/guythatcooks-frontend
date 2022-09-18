import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { BlogContext } from '../context/BlogContext'
import { UserContext } from '../context/Context'

const BlogSpecific = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs, dispatch } = useContext(BlogContext);
  let blogText = {};
  let filteredBlog;
  if(blogs) {
    filteredBlog = blogs.filter((blog) => blog._id === id);
    if(filteredBlog) {
        console.log(filteredBlog);
        blogText.__html = filteredBlog[0].sanitizedHtml;
    }
  }
  const handleEditClick = () => {
    setUpdateMode(!updateMode);
  }

  const handleBlogDelete = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.delete(`/blogs/${id}`, {
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

  const [updateMode, setUpdateMode] = useState(false)
  return (
    <>
        <form action="">
            {filteredBlog && <main className="blog-specific">
                <div className="blog-specific-top">
                    {!updateMode && <span className="blog-specific-date">{new Date(filteredBlog[0].createdAt).toDateString()}</span>}
                    {!updateMode && <div className="blog-edit-delete-btn">
                        <button className="blog-edit" onClick={handleEditClick}>
                            <FaEdit />
                        </button>
                        <button className="blog-delete" onClick={(e) => handleBlogDelete(e)}>
                            <FaTrash />
                        </button>
                    </div>}
                </div>
                <section className="blog-specific-header">
                    {updateMode ? 
                    (
                        <input className='blog-edit-title-input' type="text" placeholder='Enter Your Title' />
                    ) : 
                        <h1 className="blog-specific-title">{filteredBlog[0].title}</h1>
                    }
                    {updateMode ? 
                        (
                            <input className='blog-edit-category-input' type="text" placeholder='Enter Category' />
                        ) :
                        <span className='blog-specific-category'>{filteredBlog[0].category}</span>
                    }
                </section>
                <div className="blog-specific-image">
                    <img src={`/images/${filteredBlog[0].img}`} alt="" />
                </div>
                {updateMode && 
                    <input className='blog-edit-file' type="file" name="" id="" />
                }
                {updateMode && 
                    (<input className='blog-edit-desc-input' type="text" placeholder='Enter Your Description' />)
                }
                {updateMode ? 
                (
                    <textarea className='blog-edit-markdown-input' type="text" placeholder='Enter Your Markdown' rows="15" />
                ) : 
                <div className="blog-specific-markdown" dangerouslySetInnerHTML={blogText}></div>
                }
                {!updateMode && 
                    <div className="blog-author">Author: {filteredBlog[0].author}</div>
                }
                {updateMode && 
                    <div className="blog-update-btn-container">
                        <button type='submit' className="blog-update-btn">Update</button> 
                    </div>
                }
            </main>}
        </form>
        <ToastContainer />
    </>
  )
}

export default BlogSpecific