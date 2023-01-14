import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";

export default function ShopThese() {
  return (
    <section className="lg:flex lg:flex-row flex-col w-full gap-0">
      {/* Female wears */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="bg-chocoBrown bg-cover bg-center w-full lg:w-1/2 h-[300px]"
        style={{
          backgroundImage: "url('/brand/short.jpeg')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full text-white px-20 flex flex-col justify-center">
          <Link href={"/shop/female"}>
            <h1 className="text-2xl tracking-wide font-medium">Female Wears</h1>
            <small className="tracking-wider my-3">SHOP THESE</small>
          </Link>
        </div>
      </motion.div>

      {/* Unisex Wears */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="bg-chocoBrown bg-cover bg-center w-full lg:w-1/2 h-[300px]"
        style={{
          backgroundImage: "url('/brand/shirt.jpeg')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full text-white px-20 flex flex-col justify-center">
          <Link href={"/shop/unisex"}>
            <h1 className="text-2xl tracking-wide font-medium">Unisex Wears</h1>
            <small className="tracking-wider my-3">SHOP THESE</small>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
