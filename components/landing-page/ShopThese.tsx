import Link from "next/link";
import React from "react";

export default function ShopThese() {
  return (
    <section className="lg:flex lg:flex-row flex-col w-full gap-0">
      <div
        className="bg-chocoBrown bg-cover bg-center w-full lg:w-1/2 h-[300px]"
        style={{
          backgroundImage: "url('/brand/short.jpeg')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full text-white px-20 flex flex-col justify-center">
          <Link href={"/"}>
            <h1 className="text-2xl tracking-wide font-medium">Female Wears</h1>
            <small className="tracking-wider my-3">SHOP THESE</small>
          </Link>
        </div>
      </div>

      <div
        className="bg-chocoBrown bg-cover bg-center w-full lg:w-1/2 h-[300px]"
        style={{
          backgroundImage: "url('/brand/shirt.jpeg')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full text-white px-20 flex flex-col justify-center">
          <Link href={"/"}>
            <h1 className="text-2xl tracking-wide font-medium">Unisex Wears</h1>
            <small className="tracking-wider my-3">SHOP THESE</small>
          </Link>
        </div>
      </div>
    </section>
  );
}
