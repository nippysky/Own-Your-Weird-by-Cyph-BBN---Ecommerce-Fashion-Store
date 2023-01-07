import Link from "next/link";
import React from "react";
import urlFor from "../../utils/sanity-image";
import Image from "next/image";

export default function FemaleFeed({ female, sweatshirt }: any) {
  const femaleOutfits = [...female, ...sweatshirt];

  return (
    <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
      {femaleOutfits.map((outfit: any) => (
        <div key={outfit._id}>
          <Link href={`/shop/${outfit.slug.current}`}>
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
        </div>
      ))}
    </section>
  );
}
