import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { BlogContext } from "./context/BlogContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBlogs from "./components/FeaturedBlogs";
import PakistaniBlogs from "./components/PakistaniBlogs";
import ThaiBlogs from "./components/ThaiBlogs";
import IndianBlogs from "./components/IndianBlogs";
import JapaneseBlogs from "./components/JapaneseBlogs";
import SingleCategoryBlogs from "./components/SingleCategoryBlogs";
import BlogSpecific from "./components/BlogSpecific";
import CreateBlog from "./components/CreateBlog";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import About from './components/About';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

function App() {
  const { dispatch } = useContext(BlogContext);
  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axios.get('/blogs');
        if(res.data) {
          dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_FAILURE" })
      }
    };
    fetchBlogs();
  }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedBlogs />
              <PakistaniBlogs />
              <ThaiBlogs />
              <IndianBlogs />
              <JapaneseBlogs />
            </>
          } />
        <Route exact path="/blogs/:category" element={<SingleCategoryBlogs />} />
        <Route exact path="/blog/:id" element={<BlogSpecific />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
