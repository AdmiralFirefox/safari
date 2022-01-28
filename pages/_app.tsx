import "../styles/globals.scss";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../provider/AuthProvider";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Layout from "../components/Layout/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Layout>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
