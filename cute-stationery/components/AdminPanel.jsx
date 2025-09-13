'use client';
import React, { useState } from 'react';

export default function AdminPanel({ products, onAdd, onEdit, onDelete }){
  const [form, setForm] = useState({ title:'', price:0, image:'', description:'' });
  return (
    <div>
      <h2 className="text-xl font-bold">پنل مدیریت</h2>
      <div className="mt-4 card">
        <h3 className="font-semibold">افزودن محصول</h3>
        <input placeholder="عنوان" className="p-2 border rounded mt-2 w-full" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="قیمت" className="p-2 border rounded mt-2 w-full" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value||0)})} />
        <input placeholder="آدرس تصویر" className="p-2 border rounded mt-2 w-full" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
        <textarea placeholder="توضیحات" className="p-2 border rounded mt-2 w-full" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <div className="mt-2 flex gap-2">
          <button onClick={()=>{ onAdd({ title: form.title, price: form.price, image: form.image, description: form.description }); setForm({title:'',price:0,image:'',description:''}) }} className="btn-primary">افزودن</button>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold">محصولات موجود</h4>
        <div className="mt-2 space-y-2">
          {products.map(p=> (
            <div key={p.id} className="flex items-center gap-3 card">
              <img src={p.image} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">${p.price}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=> onEdit(p)} className="px-3 py-1 rounded border">ویرایش</button>
                <button onClick={()=> onDelete(p.id)} className="px-3 py-1 rounded border text-red-500">حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
