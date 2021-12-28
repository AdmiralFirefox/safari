import { FC } from "react";
import MainNavbar from "../Navbar/MainNavbar";
import Meta from "./Meta";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <MainNavbar />
      {children}
    </>
  );
};

export default Layout;
