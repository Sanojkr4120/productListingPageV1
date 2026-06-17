import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import CartModal from '../components/CartModal';
import { products } from '../data/products';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products by search box
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchTerm}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:px-8">
        <header className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">
            Explore our Premium Products
          </h2>
        </header>

        <ProductGrid 
          products={filteredProducts} 
          onAddToCart={handleAddToCart} 
        />
      </main>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
};

export default Home;
