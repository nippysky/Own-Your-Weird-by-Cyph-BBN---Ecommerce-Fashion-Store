import Link from "next/link";
import React from "react";
import urlFor from "../../utils/sanity-image";
import Image from "next/image";

import { motion } from "framer-motion";

export default function FemaleFeed({ female }: any) {
  return (
    <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
      {female.map((outfit: any) => (
        <motion.div
          key={outfit._id}
          whileHover={{ scale: 1.1 }}
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <Link href={`/shop/female/${outfit.slug.current}`}>
            {/* image */}
            <div className="">
              <Image
                src={`${urlFor(outfit.image)}`}
                alt={outfit.name}
                width={360}
                height={360}
                priority
              />
            </div>

            {/* name */}
            <p className="tracking-widest uppercase font-medium my-2">
              {outfit.name}
            </p>
            {/* price */}
            <p className="text-chocoBrown font-bold text-xl my-2">
              ₦{outfit.price}
            </p>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
