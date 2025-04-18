import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <header><Header /></header>
      <main className="pt-15">{children}</main>
    </div>
  );
};

export default Layout;
