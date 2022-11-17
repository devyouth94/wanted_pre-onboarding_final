import React from "react";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return <main className="bg-stone-100 px-5 py-10">{children}</main>;
};

export default Layout;
