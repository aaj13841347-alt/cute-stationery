'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CuteCart({ isOpen, onClose, cart, onCheckout }) {
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 120 }} className="fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl p-6 flex flex-col z-50">
          <h2 className="font-cute text-2xl text-pink-dark mb-4">🎀 سبد خرید</h2>
          <div className="flex-1 overflow-y-auto space-y-3">
            {cart.map(item=>(
              <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
                <div>
                  <p className="font-cute">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.qty} × {item.price.toLocaleString()} تومان</p>
                </div>
                <span className="text-pink font-bold">{(item.price*item.qty).toLocaleString()} تومان</span>
              </div>
            ))}
            {cart.length===0 && <p className="text-center text-gray-500">سبد خالیه 🐰</p>}
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="font-cute text-lg text-pink-dark">💖 جمع کل: {total.toLocaleString()} تومان</p>
            <button onClick={onCheckout} className="w-full mt-3 bg-pink text-white py-2 rounded-full font-cute shadow-md">✨ ادامه خرید</button>
          </div>
          <button onClick={onClose} className="absolute top-3 left-3 text-pink-dark text-xl">❌</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
