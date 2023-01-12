import Head from "next/head";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FemaleFeed from "../../../components/shop/FemaleFeed";

import { createClient } from "next-sanity";

export default function Female({ female }: { female: object[] }) {
  return (
    <>
      <Head>
        <title>Female - Own Your Weird</title>
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
        <FemaleFeed female={female} />
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
  const female = await client.fetch(`*[_type == "female"]`);

  if (!female) {
    return {
      notfound: true,
    };
  }

  return {
    props: {
      female,
    },
    revalidate: 360,
  };
}
