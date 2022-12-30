import Link from "next/link";
import React from "react";

export default function Sweatshirts() {
  return (
    <section className="w-full min-h-screen px-5 py-10 lg:px-20 bg-clayBrown">
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

      <Link href={"/"}>
        <p className="my-14 font-medium tracking-widest underline text-white">
          BUY SWEATSHIRTS
        </p>
      </Link>

      <section className="w-full flex gap-10">
        <div
          className="bg-chocoBrown w-[430px] h-[530px] bg-cover"
          style={{
            backgroundImage: "url('/brand/ss1.jpeg')",
          }}
        />
        <div
          className="bg-chocoBrown w-[430px] h-[530px] bg-cover"
          style={{
            backgroundImage: "url('/brand/ss2.jpeg')",
          }}
        />
        <div
          className="bg-chocoBrown w-[430px] h-[530px] bg-cover"
          style={{
            backgroundImage: "url('/brand/ss3.jpeg')",
          }}
        />
      </section>
    </section>
  );
}
