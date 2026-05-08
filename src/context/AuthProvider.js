import React, { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ 
          uid: firebaseUser.uid, 
          email: firebaseUser.email,
          displayName: firebaseUser.displayName 
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Guardar el nombre directamente en el perfil de Auth (Gratis y sin Firestore)
    await updateProfile(result.user, { displayName });
    
    // Forzar actualización del estado local
    setUser({ ...result.user, displayName });
    
    return result;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
