import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "./Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signinWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = async (updateData) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, updateData);
      setUser({ ...auth.currentUser });
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    loading,
    setLoading,
    user,
    setUser,
    createUser,
    loginUser,
    signinWithGoogle,
    updateUserProfile,
    signOutUser,
    isSeller,
    setIsSeller,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
