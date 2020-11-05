import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "../firebase";
import nextId from "react-id-generator";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (emailaddress, password) => {
    return auth.createUserWithEmailAndPassword(emailaddress, password);
  };
  const login = (emailaddress, password) => {
    return auth.signInWithEmailAndPassword(emailaddress, password);
  };
  const logout = () => {
    return auth.signOut();
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  const createUser = (email, name, golferOne, golferTwo, golferThree) => {
    const userId = nextId();
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        name,
        email,
        selections: [{ golferOne, golferTwo, golferThree, score: "" }],
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    createUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
