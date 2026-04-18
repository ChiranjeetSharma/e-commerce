'use client';

import { useState, useEffect, useMemo } from 'react';
import { productService } from '../../services/api';
import { Product, Category } from '../../types/product';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Something went wrong while fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-12">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="mt-4 text-sm font-medium text-zinc-500">Curating the best products for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
        <div className="rounded-full bg-red-50 p-6 dark:bg-red-950/20">
          <ShoppingBag className="h-12 w-12 text-red-600" />
        </div>
        <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">Oops! Something went wrong</h3>
        <p className="mt-2 max-w-sm text-zinc-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-zinc-900 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          {selectedCategory === 'All' ? 'Special For You' : selectedCategory}
          <span className="ml-3 text-sm font-normal text-zinc-400">({filteredProducts.length} items)</span>
        </h2>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 p-12 dark:border-zinc-800">
          <p className="text-zinc-400 font-medium">No products found matching your criteria.</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
