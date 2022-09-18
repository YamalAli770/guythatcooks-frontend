import React, { useReducer, createContext, useEffect } from 'react';
import { Reducer } from './Reducer';

const INITIAL_STATE = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isFetching: false,
    error: false
}

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, 
    INITIAL_STATE);

    useEffect(() => {
        if(state.user) {
            const { username, email, profilePic, isAdmin, accessToken } = state.user;
            const fetchedUser = {
            username,
            email,
            profilePic,
            isAdmin,
            accessToken
            }
            localStorage.setItem("user", JSON.stringify(fetchedUser)); 
        }
    }, [state.user])

    return (
        <UserContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{children}</UserContext.Provider>
    )
};