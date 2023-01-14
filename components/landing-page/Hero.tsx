import Link from "next/link";
import React from "react";
import Navbar from "../Navbar";

import { motion } from "framer-motion";

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
        <motion.h1
          className="text-center font-black text-clayBrown lg:text-[3rem] text-[2rem] tracking-[.16em] "
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          OWN YOUR WEIRD LAUNCH COLLECTION
        </motion.h1>

        <motion.p
          className="my-10 text-black text-center lg:text-xl"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          OYW is an urban street clothing and lifestyle brand that embodies the
          weirdness in everyone.
        </motion.p>

        <Link href={"/shop"}>
          <motion.button
            className="bg-clayBrown py-3 px-20 text-center font-semibold text-white mb-20 lg:mb-0 hover:bg-chocoBrown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            Shop
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
