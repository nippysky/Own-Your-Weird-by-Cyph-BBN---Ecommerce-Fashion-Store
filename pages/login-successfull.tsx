import React from "react";
import Image from "next/image";

export default function LoginSuccessful() {
  return (
    <section className="w-full h-screen bg-chocoBrown px-20 pt-2 pb-10 flex flex-col justify-between">
      <div className="flex justify-end">
        <Image
          src={"/brand/CyphFootLogo.svg"}
          alt={"Cyph's Logo"}
          height={250}
          width={250}
          priority
        />
      </div>

      <div className="flex justify-start text-white">
        <div>
          <p className="tracking-widest">LOGIN SUCCESSFULL</p>
          <h1 className="text-[3rem] my-5 font-thin animate-pulse">
            Owning Your Weird...
          </h1>
        </div>
      </div>
    </section>
  );
}
