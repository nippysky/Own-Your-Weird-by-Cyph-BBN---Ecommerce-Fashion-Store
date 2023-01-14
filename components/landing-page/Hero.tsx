import Link from "next/link";
import React from "react";
import Navbar from "../Navbar";

export default function Hero() {
  return (
    <section
      className="w-full lg:h-screen bg-cover px-5 lg:px-20"
      style={{
        backgroundImage: "url('/brand/HeroCover.svg')",
      }}
    >
      <Navbar />

      <div className="flex flex-col h-[80%] w-full justify-center items-center">
        <h1 className="text-center font-black text-clayBrown lg:text-[3rem] text-[2rem] tracking-[.16em] ">
          OWN YOUR WEIRD LAUNCH COLLECTION
        </h1>

        <p className="my-10 text-black text-center lg:text-xl">
          OYW is an urban street clothing and lifestyle brand that embodies the
          weirdness in everyone.
        </p>

        <Link href={"/shop"}>
          <button className="bg-clayBrown py-3 px-20 text-center font-semibold text-white mb-20 lg:mb-0 hover:bg-chocoBrown">
            Shop
          </button>
        </Link>
      </div>
    </section>
  );
}
