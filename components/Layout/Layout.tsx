import { FC } from "react";
import { useRouter } from "next/router";
import MainNavbar from "../Navbar/MainNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Meta from "./Meta";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const queryClient = new QueryClient();

let persistor = persistStore(store);

const Layout: FC = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <>
      <Meta />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {asPath === "/login" ? null : asPath === "/signup" ? null : (
              <MainNavbar />
            )}
            {children}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default Layout;
