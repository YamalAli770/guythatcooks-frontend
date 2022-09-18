import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/Context';
import { BlogContextProvider } from './context/BlogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlogContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BlogContextProvider>
  </React.StrictMode>
);
