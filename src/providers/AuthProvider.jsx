import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, createContext, useEffect } from "react";
import { auth } from "../config/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // loading must be maintained throughout the application. or else the application will break and will redirect to the login page 

    const createUser = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        setIsLoading(true)
        signOut(auth)
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('Logged user -->', currentUser);
            setIsLoading(false);
        })

        return () => {
            return subscribe()
        }
    }, [])

    const values = {
        createUser,
        login,
        logout,
        user,
        isLoading
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;