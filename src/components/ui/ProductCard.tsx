export default function ProductCard({ product }) {
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
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
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
          {/* <div className="flex items-center mb-3">
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
            </div> */}

          <button
            style={{
              background: "linear-gradient(135deg, #0f172a, #0e7490)",
            }}
            className="w-full text-white font-medium py-2 px-4 rounded-md shadow hover:shadow-md transition-all duration-300 flex items-center justify-center hover:brightness-110"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
