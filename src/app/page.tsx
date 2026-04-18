import ProductExplorer from '@/components/product/ProductExplorer';
import { ShoppingBag } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] bg-indigo-600 px-8 py-16 md:px-16 md:py-24 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Upgrade Your Lifestyle With STORE
          </h1>
          <p className="mt-6 text-lg font-medium text-indigo-100 md:text-xl">
            Explore our curated collection of electronics, jewelry, and fashion. 
            Quality meets affordability in every single piece.
          </p>
          <div className="mt-10 flex gap-3 md:gap-4">
            <button className="rounded-full bg-white px-3 py-2 md:px-4 md:py-4 font-bold text-indigo-600 transition-all hover:bg-indigo-50 hover:shadow-lg active:scale-95">
              Shop Now
            </button>
            <button className="rounded-full border-2 border-white/30 bg-white/10 px-3 py-2 md:px-4 md:py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              View Deals
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <ShoppingBag size={300} strokeWidth={1} />
        </div>
      </section>

      <ProductExplorer />
    </div>
  );
}
