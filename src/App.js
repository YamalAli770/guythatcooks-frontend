import { useContext, useEffect } from "react";
import { BlogContext } from "./context/BlogContext";
import { UserContext } from './context/UserContext';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from
  'react-router-dom';
import axios from 'axios';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBlogs from "./components/FeaturedBlogs";
import PakistaniBlogs from "./components/PakistaniBlogs";
import ThaiBlogs from "./components/ThaiBlogs";
import IndianBlogs from "./components/IndianBlogs";
import JapaneseBlogs from "./components/JapaneseBlogs";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from 'react-toastify';
import { InfinitySpin } from "react-loader-spinner";
const BlogSpecific = lazy(() => import('./components/BlogSpecific'))
const CreateBlog = lazy(() => import('./components/CreateBlog'))
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const SearchedCategory = lazy(() => import('./components/SearchedCategory'))
const NotFound = lazy(() => import('./components/NotFound'))
const Profile = lazy(() => import('./components/Profile'))
const SingleCategoryBlogs = lazy(() => import('./components/SingleCategoryBlogs'))

function App() {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(BlogContext);
  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axios.get('https://guy-that-cooks-backend.onrender.com/api/blogs');
        if (res.data) {
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
          <Route exact path="/blogs/:category" element={
            <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
              <SingleCategoryBlogs />
            </Suspense>
          } />
          <Route exact path="/blog/:id" element={
            <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
              <BlogSpecific />
            </Suspense>} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/create" element={user && user.isAdmin ?
              <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
                <CreateBlog />
              </Suspense>
              : <Navigate to="/" />} />
            <Route exact path='/me' element={
              <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
                <Profile />
              </Suspense>
            } />
          </Route>
          <Route exact path="/register" element={user ? <Navigate to="/" /> : 
            <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
              <Register />
            </Suspense>
          } />
          <Route exact path="/login" element={user ? <Navigate to="/" /> : 
            <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
              <Login />
            </Suspense>
          } />
          <Route exact path='/search' element={
            <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
              <SearchedCategory />
            </Suspense>
          } />
          <Route path='*' element={
            <Suspense fallback={<div className="infinity-loader"><InfinitySpin color="#05445E" /></div> }>
              <NotFound />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
