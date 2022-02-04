import { FC } from "react";
import { useRouter } from "next/router";
import MainNavbar from "../Navbar/MainNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Meta from "./Meta";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const queryClient = new QueryClient();

const Layout: FC = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <>
      <Meta />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {asPath === "/login" ? null : asPath === "/signup" ? null : (
            <MainNavbar />
          )}
          {children}
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default Layout;
