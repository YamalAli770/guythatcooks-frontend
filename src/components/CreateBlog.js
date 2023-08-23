import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UserContext } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { blogs, dispatch } = useContext(BlogContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [markdown, setMarkdown] = useState('');
  const handleBlogCreate = async (e) => {
    e.preventDefault();
    const newBlog = {
        author: user.username,
        title,
        category,
        img,
        desc,
        markdown
    };
    if(img && title && category && desc && markdown) {
        const data = new FormData();
        data.append("image", img);
        newBlog.img = img.name;
        try {
            await axios.post('https://guy-that-cooks-backend.onrender.com/api/upload', data)
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000
            })
        }
    }
    try {
        const res = await axios.post('https://guy-that-cooks-backend.onrender.com/api/blogs', newBlog, {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken
            }
        })
        if(res.data) {
            const updatedBlogs = blogs.push(res.data)
            dispatch({ type: 'UPDATE_BLOGS', payload: updatedBlogs })
            navigate(`/blog/${res.data._id}`)
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
  return (
    <form action="">
        <main className="create-blog">
            <section className="create-blog-header">
                <input className='create-blog-title-input' type="text" placeholder='Enter Your Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className='create-blog-category-input' type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            </section>
            {img && <div className="create-blog-image">
                <img src={URL.createObjectURL(img)} alt="" />
            </div>}
            <input className='create-blog-file' type="file" name="" id="" onChange={(e) => setImg(e.target.files[0])} />
            <input className='create-blog-desc-input' type="text" placeholder='Enter Your Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <textarea className='create-blog-markdown-input' type="text" placeholder='Enter Your Markdown' rows="15" value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
            <div className="create-blog-btn-container">
                <button type='submit' className="create-blog-btn" onClick={(e) => handleBlogCreate(e)}>Create</button> 
            </div>
        </main>
        <ToastContainer />
    </form>
  )
}

export default CreateBlog