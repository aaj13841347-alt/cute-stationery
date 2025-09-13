import React, { useState } from 'react';
import Header from '../components/Header';
import AdminPanel from '../components/AdminPanel';

export default function Admin(){
  const [products, setProducts] = useState([]);
  const add = (p)=> setProducts(prev=> [...prev, {...p, id: Date.now()}]);
  const edit = (p)=> alert('در این نمونه ویرایش ساده است — توسعه دهید');
  const del = (id)=> setProducts(prev=> prev.filter(x=>x.id!==id));
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header onOpenCart={()=>{}} />
      <div className="mt-6">
        <AdminPanel products={products} onAdd={add} onEdit={edit} onDelete={del} />
      </div>
    </div>
  );
}
