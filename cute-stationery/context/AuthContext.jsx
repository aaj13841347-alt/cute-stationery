'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{ try{ const raw = localStorage.getItem('user'); return raw?JSON.parse(raw):null }catch(e){return null} });
  useEffect(()=>{ localStorage.setItem('user', JSON.stringify(user)) },[user]);
  const login = ({email})=> setUser({email, name: email.split('@')[0]});
  const logout = ()=> setUser(null);
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
export const useAuth = ()=> useContext(AuthContext);
