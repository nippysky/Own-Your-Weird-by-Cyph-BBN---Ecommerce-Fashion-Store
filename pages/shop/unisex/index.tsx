import React from "react";
import Navbar from "../../../components/Navbar";
import Head from "next/head";
import Footer from "../../../components/Footer";
import UnisexFeed from "../../../components/shop/UnisexFeed";

import { createClient } from "next-sanity";

export default function Unisex({ unisex }: { unisex: object[] }) {
  return (
    <>
      <Head>
        <title>Unisex - Own Your Weird</title>
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

      <main className="w-full px-5 lg:px-32 py-10">
        <UnisexFeed unisex={unisex} />
      </main>

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

  if (!unisex) {
    return {
      notfound: true,
    };
  }

  return {
    props: {
      unisex,
    },
    revalidate: 360,
  };
}
