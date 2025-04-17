import BottomNavbar from "./BottomNavbar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <header><Header /></header>
      <main>{children}</main>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
