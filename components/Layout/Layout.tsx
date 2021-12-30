import { FC } from "react";
import MainNavbar from "../Navbar/MainNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Meta from "./Meta";

const queryClient = new QueryClient();

const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <QueryClientProvider client={queryClient}>
        <MainNavbar />
        {children}
      </QueryClientProvider>
    </>
  );
};

export default Layout;
