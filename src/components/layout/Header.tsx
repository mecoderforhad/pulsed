// components/Navbar.jsx
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { useState } from "react";
import Login from "../custom/Login";
import Registration from "../custom/Registration";
import { useNavigate } from "react-router";
import { useAuth } from "../../provider/useAuth";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const navigate = useNavigate();
  const authUser = useAuth();

  console.log("authUser-->", authUser);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a2c38] px-6 py-3 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div
          className="text-white text-2xl font-bold italic tracking-wide cursor-pointer transform transition-transform duration-300 hover:scale-110"
          onClick={() => navigate("/home")}
        >
          Puppy
        </div>
        {/* Navigation Buttons */}
        {authUser.token ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{authUser?.user?.name}</span>
                <span className="block truncate text-sm font-medium">
                  {authUser?.user?.phoneNumber}
                </span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => authUser.logOut()}>
                Sign out
              </DropdownItem>
            </Dropdown>
          </div>
        ) : (
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
        )}
      </nav>
      <Login openModal={openModal} setOpenModal={setOpenModal} />
      <Registration
        openModal={openRegistration}
        setOpenModal={setOpenRegistration}
      />
    </>
  );
}
