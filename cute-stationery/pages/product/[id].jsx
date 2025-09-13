import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';

const SAMPLE_PRODUCTS = [
  { id:1, title:'دفتر یادداشت خرگوشی', price:45000, image:'/notebook.svg', description:'دفتر با طرح خرگوش، 100 برگ' },
  { id:2, title:'خودکار ژله‌ای صورتی', price:2500, image:'/pen.svg', description:'نرم و روان' },
  { id:3, title:'پاک‌کن کرمی', price:1200, image:'/eraser.svg', description:'پاک‌کن بدون رد' },
];

export default function ProductPage(){
  const { query } = useRouter();
  const { add } = useCart();
  const id = parseInt(query.id);
  const product = SAMPLE_PRODUCTS.find(p=> p.id === id) || SAMPLE_PRODUCTS[0];
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header onOpenCart={()=>{}} />
      <div className="mt-6 card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={product.image} className="w-full h-full object-cover rounded" />
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4 text-xl font-bold text-accentpink">{product.price.toLocaleString()} تومان</div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=> add(product)} className="btn-primary">افزودن به سبد</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
