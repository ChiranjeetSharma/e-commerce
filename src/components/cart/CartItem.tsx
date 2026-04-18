'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as ICartItem } from '../../types/product';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white p-2">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
          sizes="96px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-zinc-800 dark:text-zinc-100">{item.title}</h3>
          <p className="mt-1 text-xs text-zinc-500 capitalize">{item.category}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{formatPrice(item.price)}</p>
          <div className="flex items-center gap-1">
             <span className="text-xs font-medium text-zinc-400 mr-2">Subtotal: {formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between border-t pt-4 sm:w-auto sm:flex-col sm:items-end sm:border-t-0 sm:pt-0 gap-4">
        <div className="flex items-center gap-3 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 active:scale-90 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-90"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <button
          onClick={() => removeItem(item.id)}
          className="flex items-center gap-2 text-sm font-semibold text-red-500 transition-colors hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sm:hidden lg:inline">Remove</span>
        </button>
      </div>
    </motion.div>
  );
}
