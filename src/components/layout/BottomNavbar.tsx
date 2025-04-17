export default function BottomNavbar() {
  return (
    <div
      className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 backdrop-blur-md border border-gray-200/50 rounded-full bottom-4 left-1/2 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #0e7490)',
      }}
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50/10 group transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-100 group-hover:text-blue-300 transition-colors duration-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="sr-only">Home</span>
        </button>
        <div
          id="tooltip-home"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip"
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
}
