import React, { useReducer, createContext } from 'react';
import { BlogReducer } from './BlogReducer';

const INITIAL_STATE = {
    blogs: null,
    isFetching: false,
    error: false
}

export const BlogContext = createContext(INITIAL_STATE);

export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BlogReducer, 
    INITIAL_STATE);

    return (
        <BlogContext.Provider value={{
            blogs: state.blogs,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{children}</BlogContext.Provider>
    )
};