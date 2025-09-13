'use client';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthForm(){
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth();
  return (
    <div className="card">
      <h3 className="font-bold">ورود / ثبت‌نام</h3>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="ایمیل" className="p-3 rounded-lg border w-full mt-3" />
      <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="رمز عبور" type="password" className="p-3 rounded-lg border w-full mt-2" />
      <button onClick={()=> login({email})} className="btn-primary mt-3 w-full">ورود (نمونه)</button>
    </div>
  );
}
