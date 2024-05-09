// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this import is correctly pointing to your Firebase config file where auth is initialized

// Create a context object
const AuthContext = createContext();

// Export a hook to access the context
export const useAuth = () => useContext(AuthContext);

// Define a provider for the AuthContext
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle the initial loading state

    useEffect(() => {
        // Listen for authentication changes with Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Set the user or null
            setLoading(false); // Set loading to false once the user is fetched
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Function to handle registration
    const register = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Function to handle login
    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Function to handle logout
    const logout = () => {
        return signOut(auth);
    };

    // Value to be passed to the context provider
    const value = {
        currentUser,
        loading,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
