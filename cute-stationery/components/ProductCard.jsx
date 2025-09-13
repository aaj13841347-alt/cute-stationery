'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductCard({ p, onAdd }){
  return (
    <motion.div layout whileHover={{ scale: 1.02 }} className="card">
      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-md font-semibold">{p.title}</h3>
      <p className="text-sm text-gray-600">{p.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold text-accentpink">${p.price.toFixed(2)}</div>
        <div className="flex gap-2">
          <button onClick={()=>onAdd(p)} className="btn-primary">افزودن</button>
          <Link href={`/product/${p.id}`} className="px-3 py-1 rounded-full border">مشاهده</Link>
        </div>
      </div>
    </motion.div>
  );
}
