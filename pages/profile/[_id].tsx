import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

export default function UserProfile() {
  return (
    <>
      <Head>
        <title>My Profile - Own Your Weird</title>
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

      <section></section>
    </>
  );
}
