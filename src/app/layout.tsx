import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'STORE | Premium E-commerce Explorer',
  description: 'Discover and shop the latest trends with STORE. A clean, responsive product explorer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <Header />
        <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          {children}
        </main>
        <footer className="border-t bg-white py-12 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-zinc-500 font-medium">© 2026 STORE. Crafted with precision for the modern web.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
