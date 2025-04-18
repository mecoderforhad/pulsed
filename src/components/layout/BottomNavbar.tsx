import { Tooltip } from "flowbite-react";
import { GiSittingDog } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

export default function BottomNavbar() {
  return (
    <div className="fixed z-50 custom-gradient w-full h-16 max-w-lg -translate-x-1/2 backdrop-blur-md border border-gray-200/50 rounded-full bottom-4 left-1/2 shadow-lg">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto mt-2">
        <Tooltip content="Home">
          <div className="mx-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center hover:bg-gray-50/10 group duration-200"
            >
              <AiFillHome className="text-white text-3xl" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </Tooltip>
        <Tooltip content="List">
          <div className="mx-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center hover:bg-gray-50/10 group duration-200"
            >
              <GiSittingDog className="text-white text-3xl" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </Tooltip>
        <Tooltip content="Add">
          <div className="mx-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center hover:bg-gray-50/10 group duration-200"
            >
              <FaPlusCircle className="text-white text-3xl" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </Tooltip>
        <Tooltip content="Share">
          <div className="mx-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center hover:bg-gray-50/10 group duration-200"
            >
              <FaShareAlt className="text-white text-3xl" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </Tooltip>
        <Tooltip content="Profile">
          <div className="mx-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center hover:bg-gray-50/10 group duration-200"
            >
              <FaUserAlt className="text-white text-3xl" />
              <span className="sr-only">Home</span>
            </button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
