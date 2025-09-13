'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try { const raw = localStorage.getItem('cart'); return raw ? JSON.parse(raw) : [] } catch(e){ return [] }
  });
  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(items)) },[items]);
  const add = (p)=> setItems(prev=>{ const f = prev.find(x=>x.id===p.id); if(f) return prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...prev,{...p,qty:1}] });
  const remove = (id)=> setItems(prev=>prev.filter(x=>x.id!==id));
  const changeQty = (id,qty)=> setItems(prev=> prev.map(x=> x.id===id?{...x,qty}:x));
  const clear = ()=> setItems([]);
  const total = items.reduce((s,i)=> s + i.price * i.qty, 0);
  return <CartContext.Provider value={{ items, add, remove, changeQty, clear, total }}>{children}</CartContext.Provider>
}
export const useCart = ()=> useContext(CartContext);
