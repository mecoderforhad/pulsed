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

export default function AppNavbar() {
  const [openModal, setOpenModal] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const navigate = useNavigate();
  const { token, user, logOut } = useAuth();

  return (
    <>
      <div className="fixed py-2 top-0 left-0 right-0 z-50 bg-[#1a2c38] px-6 shadow-md flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-white text-2xl font-bold italic tracking-wide cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={() => navigate("/")}
        >
          Puppy
        </div>

        {/* Right content */}
        <div className="flex items-center gap-6">
          {token && <Button>Invite & Earn</Button>}
          {/* Auth Section */}
          {token ? (
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
                <span className="block text-sm">{user?.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.phoneNumber}
                </span>
              </DropdownHeader>
              <DropdownItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={logOut}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <>
              <button
                className="text-white font-medium hover:underline"
                onClick={() => setOpenModal(true)}
              >
                Login
              </button>
              <Button
                color="blue"
                pill
                onClick={() => setOpenRegistration(true)}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <Login openModal={openModal} setOpenModal={setOpenModal} />
      <Registration
        openModal={openRegistration}
        setOpenModal={setOpenRegistration}
      />
    </>
  );
}
