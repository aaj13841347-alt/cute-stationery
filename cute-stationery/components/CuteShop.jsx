'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stripePromise } from '../lib/stripe';

const products = [
  { id: 1, name: '📓 دفترچه کیوت', price: 45000, image: '/notebook.svg' },
  { id: 2, name: '✏️ خودکار رنگی', price: 12000, image: '/pen.svg' },
  { id: 3, name: '🧽 پاک‌کن بامزه', price: 8000, image: '/eraser.svg' },
  { id: 4, name: '📒 دفتر خط‌دار', price: 38000, image: '/notebook.svg' },
];

const TOMAN_TO_USD = 50000;

export default function CuteShop() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState('toman');

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const formatPrice = (price) => {
    if (currency === 'toman') {
      return `${price.toLocaleString()} تومان`;
    } else {
      const usd = (price / TOMAN_TO_USD).toFixed(2);
      return `$${usd}`;
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, currency }),
    });
    const { id } = await res.json();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="min-h-screen bg-cream font-body px-6 py-10">
      <header className="text-center mb-10 bg-pattern rounded-3xl shadow-lg p-6">
        <h1 className="font-cute text-5xl text-pink-dark drop-shadow-md">🌸 کِیوت‌استور 🎀</h1>
        <p className="text-pink mt-3 font-cute text-xl">لوازم‌التحریر بامزه برای دل شاد شما ✨</p>

        <div className="mt-4 flex justify-center gap-3">
          <button onClick={() => setCurrency('toman')} className={`px-3 py-1 rounded-full ${currency==='toman' ? 'bg-pink text-white' : 'bg-white text-pink'}`}>تومان 🇮🇷</button>
          <button onClick={() => setCurrency('usd')} className={`px-3 py-1 rounded-full ${currency==='usd' ? 'bg-pink text-white' : 'bg-white text-pink'}`}>دلار 💵</button>
        </div>
      </header>

      <button onClick={() => setIsOpen(true)} className="fixed top-5 right-5 bg-pink text-white px-4 py-2 rounded-full shadow-lg font-cute">🛒 سبد ({cart.length})</button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {products.map((product) => (
          <motion.div key={product.id} whileHover={{ scale: 1.05, rotate: -1 }} className="relative bg-white rounded-2xl shadow-lg p-4 w-64 text-center">
            <span className="absolute -top-4 -right-4 text-3xl">🐰</span>
            <div className="flex justify-center">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-contain" />
            </div>
            <h2 className="mt-3 font-cute text-xl text-pink-dark">{product.name}</h2>
            <p className="text-pink font-bold mt-1">{formatPrice(product.price)}</p>
            <motion.button whileHover={{ scale: 1.1, rotate: -3 }} whileTap={{ scale: 0.9 }} onClick={() => addToCart(product)} className="mt-3 px-4 py-2 rounded-full bg-pink text-white font-cute shadow-md">🛒 افزودن به سبد</motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 120 }} className="fixed top-0 right-0 h-full w-80 bg-cream shadow-2xl p-6 flex flex-col z-50">
            <h2 className="font-cute text-2xl text-pink-dark mb-4">🎀 سبد خرید</h2>
            <div className="flex-1 overflow-y-auto space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
                  <div>
                    <p className="font-cute">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.qty} × {formatPrice(item.price)}</p>
                  </div>
                  <span className="text-pink font-bold">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              {cart.length === 0 && <p className="text-center text-gray-500">سبد خالیه 🐰</p>}
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="font-cute text-lg text-pink-dark">💖 جمع کل: {formatPrice(total)}</p>
              <button onClick={handleCheckout} className="w-full mt-3 bg-pink text-white py-2 rounded-full font-cute shadow-md">✨ ادامه خرید</button>
            </div>
            <button onClick={() => setIsOpen(false)} className="absolute top-3 left-3 text-pink-dark text-xl">❌</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
