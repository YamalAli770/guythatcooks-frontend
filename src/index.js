import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext';
import { BlogContextProvider } from './context/BlogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BlogContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BlogContextProvider>
);
