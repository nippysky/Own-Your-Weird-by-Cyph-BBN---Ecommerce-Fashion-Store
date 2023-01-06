import React from "react";
import Navbar from "../Navbar";

export default function Hero() {
  return (
    <section
      className="w-full lg:h-screen bg-cover px-5 lg:px-20 flex justify-between flex-col"
      style={{
        backgroundImage: "url('/brand/HeroCover.svg')",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className=" w-full lg:px-[15rem] px-5 flex justify-center">
        <div>
          <h1 className="text-center font-black text-clayBrown lg:text-[3rem] text-[2rem] tracking-[.16em] ">
            OWN YOUR WEIRD LAUNCH COLLECTION
          </h1>

          <p className="my-5 text-black  text-center">
            OYW is an urban street clothing and lifestyle brand which embodies
            the weird in everyone
          </p>

          {/* imaages */}
          <section className="w-full flex gap-20 justify-between items-center">
            {/* woman image */}
            <div
              className="w-1/2 h-[300px] bg-clayBrown bg-cover hidden lg:flex"
              style={{
                backgroundImage: "url('/brand/FemaleCover.jpeg')",
              }}
            />

            {/* man image */}
            <div
              className="w-1/2 h-[300px] bg-clayBrown bg-cover hidden lg:flex"
              style={{
                backgroundImage: "url('/brand/HeroBoy.svg')",
              }}
            />
          </section>
        </div>
      </div>
    </section>
  );
}
