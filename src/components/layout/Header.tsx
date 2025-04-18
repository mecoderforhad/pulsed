// components/Navbar.jsx
import { Button } from "flowbite-react";
import { useState } from "react";
import Login from "../custom/Login";
import Registration from "../custom/Registration";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a2c38] px-6 py-3 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div className="text-white text-2xl font-bold italic tracking-wide">
          Stake
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white font-medium hover:underline"
            onClick={() => setOpenModal(!openModal)}
          >
            Login
          </button>
          <Button
            color="blue"
            pill
            onClick={() => setOpenRegistration(!openRegistration)}
          >
            Register
          </Button>
        </div>
      </nav>
      <Login openModal={openModal} setOpenModal={setOpenModal} />
      <Registration
        openModal={openRegistration}
        setOpenModal={setOpenRegistration}
      />
    </>
  );
}
