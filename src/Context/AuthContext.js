import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../Firebase/firebase.init';


const auth = getAuth(app)

export const authContext = createContext();

const AuthContext = ({ children }) => {

    //state for user
    const [user, setUser] = useState({});

    //state for loader
    const [loader, setLoader] = useState(true)



    //email password signUp
    const emailPassSignup = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }



    //email password login
    const emailPassLogin = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }



    //signout
    const signout = () => {
        setLoader(true);
        return signOut(auth)
    }



    //hold user state
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);
            console.log('User:', currentUser);
            setLoader(false);
        })

        return () => {

            unsubscribe();
        }

    }, [])

    //setting authValue
    const authInfo = { emailPassSignup, emailPassLogin, signout, user, loader };
    return (
        <div>
            <authContext.Provider value={authInfo}>
                {children}
            </authContext.Provider>
        </div>
    );
};

export default AuthContext;