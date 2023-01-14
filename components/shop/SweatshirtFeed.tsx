import Link from "next/link";
import Image from "next/image";
import React from "react";
import urlFor from "../../utils/sanity-image";

import { motion } from "framer-motion";

export default function SweatshirtFeed({ sweatshirt }: any) {
  return (
    <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
      {sweatshirt.map((sweatshirt: any) => (
        <motion.div
          key={sweatshirt._id}
          whileHover={{ scale: 1.1 }}
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <Link href={`/shop/sweatshirt/${sweatshirt.slug.current}`}>
            {/* image */}
            <div className="">
              <Image
                src={`${urlFor(sweatshirt.image)}`}
                alt={sweatshirt.name}
                width={360}
                height={360}
                priority
              />
            </div>

            {/* name */}
            <p className="tracking-widest uppercase font-medium my-2">
              {sweatshirt.name}
            </p>
            {/* price */}
            <p className="text-chocoBrown font-bold text-xl my-2">
              ₦{sweatshirt.price}
            </p>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
