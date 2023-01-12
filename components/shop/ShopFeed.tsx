import Image from "next/image";
import Link from "next/link";
import React from "react";
import urlFor from "../../utils/sanity-image";

export default function ShopFeedPage({ unisex, female, sweatshirt }: any) {
  const shopProduct = [...unisex, ...female, ...sweatshirt];

  return (
    <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center place-content-center">
      {shopProduct.map((product: any) => (
        <div key={product._id}>
          <Link href={`/shop/${product.category}/${product.slug.current}`}>
            <>
              {/* image */}
              <div className="">
                <Image
                  src={`${urlFor(product.image)}`}
                  alt={product.name}
                  width={360}
                  height={360}
                  priority
                />
              </div>

              {/* name */}
              <p className="tracking-widest uppercase font-medium my-2">
                {product.name}
              </p>
              {/* price */}
              <p className="text-chocoBrown font-bold text-xl my-2">
                ₦{product.price}
              </p>
            </>
          </Link>
        </div>
      ))}
    </section>
  );
}
