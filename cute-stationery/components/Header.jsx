'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenCart, onSearch }){
  const { items } = useCart();
  const { user } = useAuth();
  return (
    <header className="flex items-center justify-between py-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pinkcute to-cream flex items-center justify-center">📚</div>
          <div>
            <h1 className="text-2xl font-extrabold">کِیوت‌استور</h1>
            <div className="text-sm text-gray-500">فروشگاه آنلاین لوازم‌التحریر</div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input onKeyDown={(e)=> e.key==='Enter' && onSearch && onSearch(e.target.value)} placeholder="جستجو..." className="pl-10 pr-4 py-2 rounded-full shadow-sm border w-72 bg-white/60" />
          <div className="absolute left-3 top-2.5"><Search /></div>
        </div>
        <button onClick={onOpenCart} className="p-2 rounded-xl bg-white/60"><ShoppingCart /></button>
        {user ? <Link href="/account">{user.name}</Link> : <Link href="/account">ورود</Link>}
      </div>
    </header>
  );
}
