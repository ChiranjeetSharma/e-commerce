'use client';

import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils';

export default function CartSummary() {
  const { getTotalPrice, items } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = items.length > 0 ? 0 : 0; // Free shipping for demo
  const tax = subtotal * 0.1; // 10% mock tax
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Subtotal</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Shipping</span>
          <span className="font-bold text-green-600">Free</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Estimated Tax (10%)</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t pt-4 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-zinc-900 dark:text-zinc-100">Total</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <button
        disabled={items.length === 0}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-4 font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-95 disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-700"
      >
        <ShoppingBag className="h-5 w-5" />
        Proceed to Checkout
        <ArrowRight className="h-5 w-5" />
      </button>
      
      <p className="mt-4 text-center text-xs text-zinc-400">
        Prices include taxes where applicable.
      </p>
    </div>
  );
}
