import React from 'react';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export default function Account(){
  const { user, logout } = useAuth();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Header onOpenCart={()=>{}} />
      <div className="mt-6">
        {user ? (
          <div className="card">
            <h3 className="font-bold">خوش آمدی، {user.name}</h3>
            <div className="mt-3">ایمیل: {user.email}</div>
            <button onClick={logout} className="mt-3 btn-primary">خروج</button>
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
    </div>
  );
}
