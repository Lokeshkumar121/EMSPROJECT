import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header onLoginClick={onLoginClick} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
