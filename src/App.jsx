import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import Pagination from './components/Pagination';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { formatPrice } from './utils/currency';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    categories: [],
    priceRange: { min: '', max: '' },
  });

  const ITEMS_PER_PAGE = 12;

  // Sample data with more products
  const sampleProducts = [
    {
      id: 1,
      name: "Modern Chair",
      brand: "Furniture Co",
      category: "Chairs",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
      stock: 15,
      description: "Comfortable modern chair perfect for any room",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 3,
      name: "Amico Bed",
      brand: "JS WoodenCrafts",
      category: "Bed",
      price: 5899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 81,
      description: "Luxurious single bed with premium wooden finish",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },{
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    {
      id: 2,
      name: "Elegant Sofa",
      brand: "LuxHome",
      category: "Sofas",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
      stock: 8,
      description: "Luxurious 3-seater sofa with premium fabric",
    },
    // ... (keep all other products, adding stock and description to each)
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Furniture Store</h1>
            <div className="relative">
              <button className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                <span className="ml-2">{formatPrice(cartTotal)}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            brands={[...new Set(products.map((p) => p.brand))]}
            categories={[...new Set(products.map((p) => p.category))]}
            onApply={() => {/* Implement filter logic */}}
            onClear={() => setFilters({
              brand: '',
              categories: [],
              priceRange: { min: '', max: '' },
            })}
          />
          
          <div className="flex-1">
            <ProductGrid
              products={paginatedProducts}
              onAddToCart={handleAddToCart}
            />
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;