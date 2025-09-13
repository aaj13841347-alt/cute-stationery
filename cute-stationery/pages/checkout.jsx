import React from 'react';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function Checkout(){
  const { items, total } = useCart();
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header onOpenCart={()=>{}} />
      <div className="mt-6 card">
        <h3 className="text-lg font-bold">پرداخت</h3>
        <div className="mt-3 text-sm text-gray-600">این فرم نمونه است و پرداخت واقعی ندارد.</div>
        <div className="mt-4">
          <div className="mb-3">آیتم‌ها:</div>
          <div className="space-y-2">
            {items.map(it=> (
              <div key={it.id} className="flex items-center justify-between">{it.name} <span>{(it.price*it.qty).toLocaleString()} تومان</span></div>
            ))}
          </div>
          <div className="mt-4 font-bold">جمع کل: {total.toLocaleString()} تومان</div>
        </div>
        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="نام و نام خانوادگی" className="p-3 rounded-lg border" />
          <input placeholder="آدرس ایمیل" className="p-3 rounded-lg border" />
          <input placeholder="آدرس ارسال" className="p-3 rounded-lg border md:col-span-2" />
          <input placeholder="کدپستی" className="p-3 rounded-lg border" />
          <button className="md:col-span-2 py-3 rounded-lg bg-accentpink text-white font-bold">ثبت سفارش (نمونه)</button>
        </form>
      </div>
    </div>
  );
}
