'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-white p-6">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100">
           <div className="rounded-full bg-white p-3 text-zinc-900 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-5 w-5" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-zinc-500">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-zinc-400">{product.rating.count} reviews</span>
        </div>

        <Link href={`/product/${product.id}`} className="mb-2 line-clamp-2 min-h-[2.5rem] flex-1 text-sm font-bold text-zinc-800 transition-colors hover:text-indigo-600 dark:text-zinc-100">
          {product.title}
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-indigo-600 active:scale-90 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-indigo-400"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
