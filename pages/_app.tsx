import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import ScrollUp from "../components/ScrollUp";
import { Inter } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"], display: "swap" });

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <NextNProgress
            color="#512116"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            showOnShallow={true}
            options={{ easing: "ease", speed: 500 }}
          />
          <ScrollUp />
          <PersistGate persistor={persistor}>
            {/* @ts-ignore */}
            {Component.auth ? (
              <Auth>
                <main className={inter.className}>
                  <Component {...pageProps} />
                  <ToastContainer
                    position="bottom-right"
                    limit={1}
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                  />
                </main>
              </Auth>
            ) : (
              <main className={inter.className}>
                <Component {...pageProps} />
                <ToastContainer
                  position="bottom-right"
                  limit={1}
                  autoClose={2000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                  theme="colored"
                />
              </main>
            )}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

function Auth({ children }: any) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=Login Required");
    },
  });

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return children;
}
