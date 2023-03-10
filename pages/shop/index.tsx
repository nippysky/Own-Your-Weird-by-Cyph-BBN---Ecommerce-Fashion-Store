import { createClient } from "next-sanity";
import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ShopFeed from "../../components/shop/ShopFeed";

export default function Shop({ shopItems }: { shopItems: object[] }) {
  return (
    <>
      <Head>
        <title>Shop - Own Your Weird</title>
        <meta
          name="description"
          content="Own Your Weird is an urban street clothing and lifestyle brand which embodies the weird in everyone."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-5 lg:px-20">
        <Navbar />
      </header>

      <section className="w-full px-5 lg:px-32 py-10">
        <ShopFeed shopItems={shopItems} />
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

const client = createClient({
  projectId: "oftxvk10",
  dataset: "production",
  apiVersion: "2023-01-07",
  useCdn: false,
});

export async function getStaticProps() {
  const unisex = await client.fetch(`*[_type == "unisex"]`);
  const female = await client.fetch(`*[_type == "female"]`);
  const sweatshirt = await client.fetch(`*[_type == "sweatshirt"]`);

  const shopItems = [...unisex, ...female, ...sweatshirt].sort(
    () => Math.random() - 0.5
  );

  if (!unisex || !female || !sweatshirt) {
    return {
      notfound: true,
    };
  }

  return {
    props: {
      shopItems,
    },
    revalidate: 360,
  };
}
