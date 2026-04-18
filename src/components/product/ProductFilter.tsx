'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Category } from '../../types/product';
import { cn } from '../../utils';

interface FilterProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: FilterProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 bg-white p-4 rounded-2xl border dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="h-11 w-full rounded-xl border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-950"
        />
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <div className="flex items-center gap-2 mr-2 border-r pr-4 dark:border-zinc-800 hidden sm:flex">
          <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Filters</span>
        </div>
        
        <button
          onClick={() => setSelectedCategory('All')}
          className={cn(
            "whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all",
            selectedCategory === 'All'
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200/50 dark:shadow-none"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          )}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all",
              selectedCategory === category
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200/50 dark:shadow-none"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
