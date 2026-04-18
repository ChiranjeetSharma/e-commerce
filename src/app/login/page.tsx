import LoginForm from '@/components/layout/LoginForm';
import { ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-12">
      <div className="mb-12 flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-600 p-3 text-white shadow-lg">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <span className="text-3xl font-black tracking-tighter">
          STORE
        </span>
      </div>
      
      <LoginForm />
      
      <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale grayscale-100">
        {/* Mock partner logos or trust badges */}
        <span className="text-lg font-black tracking-tighter">NIKE</span>
        <span className="text-lg font-black tracking-tighter">ADIDAS</span>
        <span className="text-lg font-black tracking-tighter">ZARA</span>
        <span className="text-lg font-black tracking-tighter">APPLE</span>
      </div>
    </div>
  );
}
