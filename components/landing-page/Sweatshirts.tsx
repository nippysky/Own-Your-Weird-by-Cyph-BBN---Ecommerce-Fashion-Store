import React from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

export default function Sweatshirts() {
  return (
    <section className="w-full lg:min-h-screen px-5 py-10 lg:px-20 bg-clayBrown">
      <h1 className="font-semibold text-2xl text-white tracking-wide">
        Launch Collection Sweatshirts
      </h1>

      <p className="text-white my-10 font-normal">
        Stay warm and stylish with our cozy sweatshirt. Made from high-quality
        materials, this sweatshirt is soft to the touch and will keep you
        comfortable all day long. Plus, with our range of designs to choose
        from, you'll be sure to find the perfect sweatshirt to match your unique
        style.
      </p>

      <Link href={"/shop/sweatshirt"}>
        <p className="my-14 font-medium tracking-widest underline text-white">
          BUY SWEATSHIRTS
        </p>
      </Link>

      <section className="w-full hidden lg:flex lg:flex-row flex-col gap-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            exit={{ opacity: 0, x: 200 }}
            className="lg:flex bg-chocoBrown w-[430px] h-[530px] bg-cover"
            style={{
              backgroundImage: "url('/brand/ss1.jpeg')",
            }}
          />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className="lg:flex bg-chocoBrown w-[430px] h-[530px] bg-cover"
          style={{
            backgroundImage: "url('/brand/ss2.jpeg')",
          }}
        />

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            exit={{ opacity: 0, x: 200 }}
            className="lg:flex bg-chocoBrown w-[430px] h-[530px] bg-cover"
            style={{
              backgroundImage: "url('/brand/ss3.jpeg')",
            }}
          />
        </AnimatePresence>
      </section>
    </section>
  );
}
