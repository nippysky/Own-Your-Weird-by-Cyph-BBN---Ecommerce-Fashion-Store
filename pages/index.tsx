import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/landing-page/Hero";
import Newsletter from "../components/landing-page/Newsletter";
import ShopThese from "../components/landing-page/ShopThese";
import Sweatshirts from "../components/landing-page/Sweatshirts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Own Your Weird - Cyph</title>
        <meta
          name="description"
          content="Own Your Weird is an urban street clothing and lifestyle brand which embodies the weird in everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Hero />
        <Sweatshirts />
        <ShopThese />
        <Newsletter />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
