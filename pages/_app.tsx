import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import ScrollUp from "../components/ScrollUp";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <NextNProgress
          color="#512116"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{ easing: "ease", speed: 500 }}
        />
        <ScrollUp />
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}
