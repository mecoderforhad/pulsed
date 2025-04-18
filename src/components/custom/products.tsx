import { useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { initialProducts } from '../../_mock/products';

const ProductGrid = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [products] = useState(initialProducts);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  return (
    <div className="min-h-screen custom-gradient-dark-ui py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-50 mb-12">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleProducts).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="mt-5 text-center">
            <button 
              onClick={loadMore}
              className="border border-[#1e3a48] text-white font-medium py-2 px-6 rounded-md shadow-sm transition-all duration-300"
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