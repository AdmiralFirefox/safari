import { FC } from "react";
import { useRouter } from "next/router";
import MainNavbar from "../Navbar/MainNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Meta from "./Meta";

const queryClient = new QueryClient();

const Layout: FC = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <>
      <Meta />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        {asPath === "/login" ? null : asPath === "/signup" ? null : (
          <MainNavbar />
        )}
        {children}
      </QueryClientProvider>
    </>
  );
};

export default Layout;
