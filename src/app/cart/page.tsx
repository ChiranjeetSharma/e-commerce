'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}

function CartContent() {
  const { items, clearCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-12 text-center">
        <div className="rounded-full bg-indigo-50 p-10 dark:bg-indigo-950/20">
          <ShoppingBag size={80} className="text-indigo-600" />
        </div>
        <h2 className="mt-8 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Your basket is empty</h2>
        <p className="mt-4 max-w-sm text-lg font-medium text-zinc-500">
          Looks like you haven&apos;t added anything to your cart yet. Let&apos;s find something amazing for you!
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-zinc-900 px-10 py-4 font-bold text-white transition-all hover:bg-indigo-600 hover:shadow-xl active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-zinc-500 font-medium">Enjoying your selections? You have {itemCount} items.</p>
        </div>
        
        <div className="flex gap-3 md:gap-4">
           <button
            onClick={clearCart}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200  px-3 md:px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-950/20"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-3 md:px-4 py-2 text-sm font-bold text-zinc-600 transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
