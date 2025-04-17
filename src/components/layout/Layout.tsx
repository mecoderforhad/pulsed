import BottomNavbar from "./BottomNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
