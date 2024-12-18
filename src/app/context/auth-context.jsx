'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../../firebase/firebasedb'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from "next/navigation";

const AuthContext = createContext();
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmLogout) {
      return;
    }

    await signOut(auth);
    setUser(null);  
    setLoading(true);  
    router.push("/");  
    alert("로그아웃 되었습니다.")
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
