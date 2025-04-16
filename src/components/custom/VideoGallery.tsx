export default function VideoGallery() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-center font-bold text-4xl md:text-5xl mb-12 tracking-wide">
        <span className="text-[#0056b3]">VIDEO</span> GALLERY
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800">
            <img
              src="/public/assets/thumbnail/thumb1.jpg"
              alt="Video thumbnail"
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-blue-600/80 rounded-full p-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.8L14.8 10l-8.5 7.2V2.8z" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-4 dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Amazing Nature
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              2:45 min
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800">
            <img
              src="/public/assets/thumbnail/thumb2.jpg"
              alt="Video thumbnail"
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-blue-600/80 rounded-full p-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.8L14.8 10l-8.5 7.2V2.8z" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-4 dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              City Adventures
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              4:12 min
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800">
            <img
              src="/public/assets/thumbnail/thumb3.jpg"
              alt="Video thumbnail"
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-blue-600/80 rounded-full p-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.8L14.8 10l-8.5 7.2V2.8z" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-4 dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Tech Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              8:30 min
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800">
            <img
              src="/public/assets/thumbnail/thumb4.jpg"
              alt="Video thumbnail"
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-blue-600/80 rounded-full p-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.8L14.8 10l-8.5 7.2V2.8z" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-4 dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Travel Vlog
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              6:15 min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
