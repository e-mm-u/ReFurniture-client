import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // create user email-pass 
    const createUser = (email, password) => {
        setLoading(true);
        console.log('setloading true from createUser');
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // update a user profile
    const updateUser = (userInfo) => {
        setLoading(true);
        console.log('setloading true from updateUser');
        return updateProfile(auth.currentUser, userInfo)
    }

    // log in with email, password
    const login = (email, password) => {
        setLoading(true);
        console.log('setloading true from login');
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login 
    const googleLogin = () => {
        setLoading(true);
        console.log('setloading true from google login');
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }


    // log out user
    const logOut = () => {
        setLoading(true);
        console.log('setloading true from logout');
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log('monitoring, user');
            setUser(currentUser);
            console.log('current user after onauth state changed', currentUser);
            setLoading(false);
            console.log('setloading false from onAuthStateChanged');
        } )

        return ()=> unsubscribe();

    }, [])
    const authInfo = {
        createUser, updateUser, login, googleLogin, logOut, 
        user, setUser, loading, setLoading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;