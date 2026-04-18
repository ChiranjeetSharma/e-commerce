'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw, Loader2 } from 'lucide-react';
import { productService } from '@/services/api';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await productService.getProductById(id as string);
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-indigo-600 font-bold hover:underline"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 font-bold text-zinc-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Results
      </button>

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-white p-12 shadow-inner border dark:bg-zinc-900 dark:border-zinc-800"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-12"
            priority
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
              {product.category}
            </span>
            <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl text-zinc-900 dark:text-zinc-100">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-600 dark:bg-amber-950/20">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="font-black">{product.rating.rate}</span>
              </div>
              <span className="text-sm font-medium text-zinc-400 border-l pl-4 dark:border-zinc-800">
                {product.rating.count} Verified Reviews
              </span>
            </div>
          </div>

          <div className="mt-8">
            <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
              {formatPrice(product.price)}
            </span>
            <p className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              {product.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addItem(product)}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-zinc-900 py-5 font-bold text-white transition-all hover:bg-indigo-600 hover:shadow-xl active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-indigo-400"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Basket
            </button>
            <button className="flex items-center justify-center rounded-2xl border-2 border-zinc-200 px-8 py-5 font-bold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900">
              Buy Now
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t dark:border-zinc-800">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800 text-indigo-600">
                <Truck className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider">Free Shipping</p>
              <p className="text-[10px] text-zinc-400">On all orders above $100</p>
            </div>
             <div className="flex flex-col items-center text-center space-y-2">
              <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800 text-indigo-600">
                <RefreshCw className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider">60-Day Returns</p>
              <p className="text-[10px] text-zinc-400">Hassle-free money back</p>
            </div>
             <div className="flex flex-col items-center text-center space-y-2">
              <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800 text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider">2-Year Warranty</p>
              <p className="text-[10px] text-zinc-400">Full quality protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
