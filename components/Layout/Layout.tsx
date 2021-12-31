import { FC } from "react";
import MainNavbar from "../Navbar/MainNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Meta from "./Meta";

const queryClient = new QueryClient();

const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <MainNavbar />
        {children}
      </QueryClientProvider>
    </>
  );
};

export default Layout;
