# 🛒 STORE - Premium E-Commerce Explorer

STORE is a high-performance, responsive e-commerce application built with Next.js 15. It features a curated product discovery experience, robust cart management, and a sleek, modern UI designed for a premium shopping experience.


## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with LocalStorage persistence)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Fetching**: [Axios](https://axios-http.com/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)


## Features Implemented

### 1. **Authentication (Mock)**
- **Login Flow**: Basic login functionality using a mock service.
- **Session Persistence**: User session is stored in `localStorage` via Zustand.
- **Protected Routes**: The Shopping Cart page is restricted to logged-in users only.

### 2. **Product Discovery**
- **Unified Fetching**: Real-time product retrieval from the Fake Store API.
- **Advanced Search**: Debounced search functionality to prevent unnecessary re-renders.
- **Category Filtering**: Seamless filtering across all store categories.
- **Empty & Loading States**: Elegant loaders and "no results" feedback.

### 3. **Product Details**
- **Dynamic Routing**: Dedicated pages for every product with full description and ratings.
- **Interactive UI**: Hover zooms and smooth entrance animations.

### 4. **Cart Management**
- **Persistent Basket**: Items stay in your cart even after refresh.
- **Quantity Controls**: Add, remove, or update quantities directly from the cart.
- **Real-time Totals**: Automatic calculation of subtotals, taxes, and shipping.

### 5. **Premium UX**
- **Dark Mode**: Fully integrated dark theme support with persistence.
- **Micro-interactions**: Subtle button bounces and hover effects.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop.


## Setup Instructions

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Installation
```bash
# Clone the repository and enter the directory
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add:
```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.


## Key Decisions & Assumptions

### **1. State Management with Zustand**
I chose **Zustand** over Redux or Context API because of its boilerplate-free setup and native support for middleware like `persist`. This allowed for an extremely responsive cart experience without the complexity of a global provider wrapping the entire app.

### **2. Service Layer Pattern**
Instead of calling `axios` inside components, I implemented a `productService`. This decouples the UI from the API structure, making it easy to swap data sources or add caching in the future.

### **3. Absolute Imports**
Configured `@/*` path aliases for cleaner imports and better maintainability as the project grows.

### **4. Mock Auth Strategy**
Assumed a session-based mock login since no backend was provided. Used a `ProtectedRoute` component to demonstrate route guarding logic common in production apps.

### **5. Debounced Search**
Implemented a custom `useDebounce` hook. This is a critical performance optimization that ensures the API is only hit once the user stops typing, rather than on every keystroke.


## Folder Structure
- `/src/app`: Page routes and layouts.
- `/src/components`: UI components grouped by feature (layout, product, cart).
- `/src/services`: API interaction logic.
- `/src/store`: Zustand state stores.
- `/src/hooks`: Reusable custom hooks.
- `/src/types`: TypeScript interfaces.
