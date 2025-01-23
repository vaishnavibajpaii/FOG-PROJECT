import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '../utils/currency';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="relative group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-secondary mb-1">{product.category}</div>
        <h3 className="text-lg font-semibold text-primary mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-accent font-bold">{formatPrice(product.price)}</span>
          <span className="text-secondary text-sm">{product.brand}</span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={product.stock === 0}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-red-500 mt-2">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;