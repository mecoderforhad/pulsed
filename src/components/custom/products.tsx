import { useState } from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
          src={product.image} 
          alt={product.title} 
        />
      </div>
      
      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
          <div className="flex flex-col items-end">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-0.5 rounded">
              ${product.price}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        {/* Rating and Button */}
        <div className="mt-auto">
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 text-xs ml-1">({product.reviewCount})</span>
          </div>
          
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md shadow hover:shadow-md transition-all duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const initialProducts = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 89.99,
      originalPrice: 119.99,
      description: "Premium sound with noise cancellation and 30-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4,
      reviewCount: 125
    },
    {
      id: 2,
      title: "Smart Watch Pro",
      price: 199.99,
      description: "Track fitness, receive notifications, and make payments.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 5,
      reviewCount: 89
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 59.99,
      description: "Compact yet powerful with 12-hour playtime, waterproof design.",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4,
      reviewCount: 64
    },
    {
      id: 4,
      title: "4K Action Camera",
      price: 249.99,
      description: "Record stunning 4K videos with image stabilization.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4,
      reviewCount: 42
    },
    {
      id: 5,
      title: "Wireless Earbuds",
      price: 129.99,
      originalPrice: 159.99,
      description: "True wireless earbuds with premium sound quality.",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4,
      reviewCount: 78
    },
    {
      id: 6,
      title: "Fitness Tracker",
      price: 79.99,
      description: "Monitor heart rate, steps, and sleep patterns.",
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 3,
      reviewCount: 56
    },
    {
      id: 7,
      title: "Tablet Pro",
      price: 349.99,
      description: "10.5-inch display with stylus support and all-day battery.",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 5,
      reviewCount: 112
    },
    {
      id: 8,
      title: "Gaming Mouse",
      price: 49.99,
      description: "High-precision gaming mouse with customizable buttons.",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4,
      reviewCount: 34
    }
  ];

  const [visibleProducts, setVisibleProducts] = useState(4);
  const [products] = useState(initialProducts);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleProducts).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={loadMore}
              className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2 px-6 rounded-md shadow-sm transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;