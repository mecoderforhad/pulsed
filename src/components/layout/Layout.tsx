import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header><Header /></header>
      <main className="pt-15">{children}</main>
    </div>
  );
};

export default Layout;